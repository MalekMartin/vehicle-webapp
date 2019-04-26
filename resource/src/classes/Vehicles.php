<?php

//require 'Dto/FuelEventDto.php';
//require 'Dto/CostEventDto.php';

class Vehicles {

    private $db;
    private $events;
    private $uid;

    public function __construct($db, $uid) {
        $this->db = $db;
        $this->seller = new Seller($db, $uid);
        $this->buyer = new Buyer($db, $uid);
        $this->engine = new Engine($db, $uid);
        $this->events = new Event($db, $uid);
        $this->uid = $uid;
    }

    public function getAllVehicles() {
        $data = $this->findAllVehicles();
        $res = $data->fetchAll();

        $vehicles = array();
        foreach ($res as $v) {
            $vehicle = $v;
            $vehicle['hasFile'] = $v['hasFile'] == '1' ? true : false;
            $vehicle['price'] = floatval($v['price']);
            $vehicle['odo'] = floatval($v['odo']);
            $vehicle['odo2'] = floatval($v['odo2']);
            $vehicle['lastOdo'] = floatval($v['lastOdo']);
            $vehicle['lastOdo2'] = floatval($v['lastOdo2']);
            $vehicle['manufactureYear'] = floatval($v['manufactureYear']);
            $vehicle['units'] = $v['units'];
            $vehicle['subUnits'] = $v['subUnits'] ? $v['subUnits'] : null;
            $vehicle['tankCapacity'] = $v['tankCapacity'] ? floatval($v['tankCapacity']) : null;
            array_push($vehicles, $vehicle);
        }
        return $vehicles;
    }

    public function getVehicleById($id) {
        $data = $this->findVehicleById($id);
        $res = $data->fetch();
        return $res;
    }

    private function findAllVehicles() {
        $par = array();
        $dotaz = $this->db->prepare('
            SELECT vehicles.id AS id, vehicles.model, vehicles.brand,
            vehicles.manufactureYear, seller.date AS purchaseDate, seller.price, seller.odo, seller.odo2,
            vehicles.units, vehicles.subUnits,
            (SELECT MAX(fuel.odo) FROM fuel WHERE fuel.vehicleId = vehicles.id) AS lastOdo,
            (SELECT MAX(fuel.odo2) FROM fuel WHERE fuel.vehicleId = vehicles.id) AS lastOdo2,
            tankCapacity,
            (CASE WHEN files.id > 0 THEN true ELSE false END) AS hasFile,
            buyer.date AS dateOfSale
            FROM `vehicles`
            LEFT JOIN seller ON seller.vehicleId = vehicles.id
            LEFT JOIN files ON vehicles.id = files.vehicleId
            LEFT JOIN buyer ON vehicles.id = buyer.vehicleId
            WHERE vehicles.userId = ?
            ORDER BY purchaseDate DESC');
        $dotaz->execute(array($this->uid));
        return $dotaz;
    }

    private function findVehicleById($id) {
        $dotaz = $this->db->prepare('
            SELECT vehicles.id AS id, vehicles.model, vehicles.brand,
            vehicles.manufactureYear, seller.date AS purchaseDate, seller.price, seller.odo, seller.odo2,
            vehicles.units, vehicles.subUnits,
            (SELECT fuel.odo FROM fuel WHERE fuel.vehicleId = vehicles.id ORDER BY id DESC LIMIT 1) AS lastOdo,
            (SELECT fuel.odo2 FROM fuel WHERE fuel.vehicleId = vehicles.id ORDER BY id DESC LIMIT 1) AS lastOdo2,
            tankCapacity
            FROM `vehicles`
            LEFT JOIN seller ON seller.vehicleId = vehicles.id
            WHERE vehicles.id = ? AND userId = ?
            ORDER BY vehicles.brand ASC, vehicles.model');
        $dotaz->execute(array($id, $this->uid));
        return $dotaz;
    }

    private function insertVehicle($brand, $model, $manufactureYear, $spz, $previousOwners, $type, $units, $subUnits, $notes) {
        $query = $this->db->prepare('INSERT INTO vehicles
            (`brand`, `model`, manufactureYear, spz, previousOwners, type, notes, userId, units, subUnits)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ');
        $query->execute(array($brand, $model, $manufactureYear, $spz, intVal($previousOwners), $type, $notes, $this->uid, $units, $subUnits));
        return $this->db->lastInsertId();
    }

    public function getLastEvents() {
        $fuel = $this->findLastFuelings();
        $costs = $this->findLastCosts();
        $data = $this->events->getLastEvents();

        return $data;

    }

    private function findLastFuelings() {
        $query = $this->db->prepare('SELECT vehicles.brand, vehicles.model, fuel.date, fuel.quantity, 
            fuel.price, fuel.fullTank, fuel.odo AS odo, fuel.odo2 AS odo2
            FROM fuel
                INNER JOIN vehicles ON fuel.vehicleId=vehicles.id 
            WHERE vehicles.userId = ?
            ORDER BY fuel.date DESC
            LIMIT 10');
        $query->execute(array($this->uid));
        return $query;
    }

    private function findLastCosts() {
        $query = $this->db->prepare('SELECT vehicles.brand, vehicles.model, category.title AS category, costs.title, costs.note, costs.date,
            costs.totalPrice AS price, costs.odo, costs.odo2
            FROM `costs` 
                INNER JOIN category ON costs.category=category.id 
                INNER JOIN vehicles ON costs.vehicleId=vehicles.id 
            ORDER BY costs.date DESC
            LIMIT 10');
        $query->execute(array());
        return $query;
    }

    public function addVehicle($data) {
        $lastId = $this->insertVehicle($data->brand, $data->model, $data->manufactureYear, $data->spz, $data->previousOwners, $data->type, $data->units, $data->subUnits, $data->notes);

        $this->engine->insertEmptyEngine($lastId);
        $this->buyer->insertEmptyBuyer($lastId);
        $this->seller->insertEmptySeller($lastId);
        return $lastId;
    }

    public function deleteVehicleById($id) {
        $query = $this->db->prepare('DELETE FROM maintenance WHERE vehicleId = ?');
        $query->execute(array($id));

        $query = $this->db->prepare('DELETE FROM vehicles WHERE id = ? AND userId = ?');
        $query->execute(array($id, $this->uid));
    }

    public function saveSettings($id, $d) {
        $query = $this->db->prepare('UPDATE vehicles SET units = ?, subUnits = ?, tankCapacity = ? WHERE id = ? AND userId = ?');
        $query->execute(array($d->units, $d->subUnits, $d->tankCapacity, $id, $this->uid));
    }
}