<?php
require 'Dto/FuelEventDto.php';
require 'Dto/CostEventDto.php';
require 'Dto/TireBuyEventDto.php';
require 'Dto/TireChangeDto.php';
require 'Dto/TkEventDto.php';

class Event {

    public $db;
    public $limit = 5;
    private $uid;

    public function __construct($db, $uid) {
        $this->db = $db;
        $this->uid = $uid;
    }

    public function getLastEvents() {
        $fuel = $this->findLastFuelings();
        $costs = $this->findLastCosts();
        $newTires = $this->findTiresBuy();
        $tireChanges = $this->findTiresChange();
        $tks = $this->findTks();

        $data = [];

        foreach ($fuel as $f) {
            $data[] = new FuelEventDto($f);
        }

        foreach ($costs as $c) {
            $data[] = new CostEventDto($c);
        }

        foreach ($newTires as $t) {
            $data[] = new TireBuyEventDto($t);
        }

        foreach ($tireChanges as $t) {
            $data[] = new TireChangeDto($t);
        }

        foreach ($tks as $t) {
            $data[] = new TkEventDto($t);
        }
        return $data;

    }

    private function findLastFuelings() {
        $query = $this->db->prepare('SELECT vehicles.brand, vehicles.model, fuel.date, fuel.quantity, 
            fuel.price, fuel.fullTank, fuel.odo AS odo, fuel.odo2 AS odo2
            FROM fuel
                INNER JOIN vehicles ON fuel.vehicleId=vehicles.id 
            WHERE vehicles.userId = ?
            ORDER BY fuel.date DESC LIMIT '.$this->limit);
        $query->execute(array($this->uid));
        return $query;
    }

    private function findLastCosts() {
        $query = $this->db->prepare('SELECT vehicles.brand, vehicles.model, category.title AS category,
            costs.title, costs.note, costs.date,
            costs.totalPrice AS price, costs.odo, costs.odo2
            FROM `costs` 
                INNER JOIN category ON costs.category=category.id 
                INNER JOIN vehicles ON costs.vehicleId=vehicles.id 
            WHERE vehicles.userId = ?
            ORDER BY costs.date DESC LIMIT '.$this->limit);
        $query->execute(array($this->uid));
        return $query;
    }

    private function findTiresBuy() {
        $query = $this->db->prepare('SELECT vehicles.brand, vehicles.model, tires.purchaseDate AS `date`, totalPrice AS price,
            tires.notes AS note, CONCAT(tires.brand, " ", tires.model) AS tire, dimensions, quantity
            FROM tires
                INNER JOIN vehicles ON tires.vehicleId = vehicles.id
            WHERE vehicles.userId = ?
            ORDER BY tires.purchaseDate DESC LIMIT '.$this->limit);
        $query->execute(array($this->uid));
        return $query;
    }

    private function findTiresChange() {
        $query = $this->db->prepare('SELECT vehicles.brand, vehicles.model, CONCAT(tires.brand, " ", tires.model) AS tire, tires.dimensions, t.date AS `date`, t.odo, t.odo2, t.status FROM `tire_change` AS t
            INNER JOIN tires ON t.tireId = tires.id
            INNER JOIN vehicles ON tires.vehicleId = vehicles.id
            WHERE vehicles.userId = ?
            ORDER BY `date` LIMIT '.$this->limit);
        $query->execute(array($this->uid));
        return $query;
    }

    private function findTks() {
        $query = $this->db->prepare('SELECT v.brand, v.model, `date`, expirationDate, note, repeated, price, odo, odo2, s.name AS station, s.id AS stationId FROM `technical_inspection` AS ti
            INNER JOIN vehicles AS v ON ti.vehicleId = v.id
            LEFT JOIN station AS s ON ti.stationId = s.id
            WHERE v.userId = ?
            ORDER BY `date` DESC LIMIT '.$this->limit);
        $query->execute(array($this->uid));
        return $query;
    }

    private function findLastTks() {
        $query = $this->db->prepare('SELECT ti.id, vehicleId, MAX(`date`) AS lastDate, expirationDate, v.brand, v.model, odo, odo2
        FROM technical_inspection as ti
        INNER JOIN vehicles AS v ON ti.vehicleId = v.id
        WHERE v.userId = ?
        GROUP BY vehicleId');
        $query->execute(array($this->uid));
        return $query->fetchAll();
    }

    public function getExpiredTks() {
        $tks = $this->findLastTks();

        $expired = array_filter($tks, function($val) {
            return strtotime($val['expirationDate']) < time();
        });

        return $expired;
    }

    private function findExpiredMaintenances() {
        $query = $this->db->prepare('SELECT v.id, v.brand, v.model, i.name, m.odo, m.odo2, m.date,
        i.odo AS iOdo, i.odo2 AS iOdo2, i.months,
        (SELECT MAX(odo) FROM fuel WHERE fuel.vehicleId = v.id) as fOdo,
        (SELECT MAX(odo2) FROM fuel WHERE fuel.vehicleId = v.id) as fOdo2
        FROM maintenance as m
            INNER JOIN vehicles as v ON v.id = m.vehicleId
            INNER JOIN intervals as i ON i.id = m.intervalId
        WHERE v.userId = ? AND m.status = ?');
        $query->execute(array($this->uid, 0));
        return $query->fetchAll();
    }

    public function getExpiredMaintenances() {
        $data = $this->findExpiredMaintenances();

        $expired = [];
        if ($data) {
            foreach($data as $v) {
                $expOdo = $v['odo'] + $v['iOdo'];
                $expOdo2 = $v['odo2'] + $v['iOdo2'];
                $expDate = strtotime($v['date']) + ($v['months'] * 3600 * 24 * 30);

                $actualOdo = $v['fOdo'];
                $actualOdo2 = $v['fOdo2'];
                $now = time();

                if ($actualOdo >= $expOdo || $actualOdo >= $expOdo2 || $now > $expDate) {
                    $expired[] = $v;
                }
            }
        }

        return $expired;
    }

}