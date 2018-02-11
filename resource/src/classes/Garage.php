<?php
class Garage {

    public $db;
    private $uid;

    public function __construct($db,$uid) {
        $this->db = $db;
        $this->uid = $uid;
    }

    public function addGarage($d) {
        $query = $this->db->prepare('INSERT INTO garage (name, address, city, zipCode, web, phone, notes, userId)
            VALUES (?,?,?,?,?,?,?,?)');
        $query->execute(array($d->name,$d->address, $d->city, $d->zipCode, $d->web, $d->phone, $d->notes, $this->uid));
    }

    public function updateGarage($d) {
        $query = $this->db->prepare('UPDATE garage SET name = ?, address = ?, city = ?, zipCode = ?, web = ?, phone = ?, notes = ?
            WHERE id = ? AND userId = ?');
        $query->execute(array($d->name,$d->address, $d->city, $d->zipCode, $d->web, $d->phone, $d->notes, $d->id, $this->uid));
    }

    public function getGarages() {
        $query = $this->db->prepare('SELECT id, name, address, zipCode, city, web, phone, notes,
            (SELECT COUNT(repair.id) FROM repair WHERE repair.garageId = garage.id) as repairCount,
            (SELECT SUM(repair.totalPrice) FROM repair WHERE repair.garageId = garage.id) as repairCosts
            FROM garage
            WHERE userId = ?
            ORDER BY name');
        $query->execute(array($this->uid));
        return $query->fetchAll();
    }

    public function delete($id) {
        $query = $this->db->prepare('DELETE FROM garage WHERE id = ? AND userId = ?');
        try {
            $query->execute(array($id, $this->uid));
        } catch (PDOException $e) {
            $msg = $e->getMessage();
            echo $msg;
        }
    }

    public function getGarage($id) {
        $query = $this->db->prepare('SELECT id, name, address, city, zipCode, web, phone, notes
            FROM garage WHERE id = ? AND userId = ?');
        $query->execute(array($id, $this->uid));
        return $query->fetch();
    }

    private function findGarageRepairs($id) {
        $query = $this->db->prepare('SELECT repair.id, vehicleId, title, `date`, totalPrice,
        repair.notes, repair.odo, repair.odo2, vehicles.brand, vehicles.model, vehicles.units, vehicles.subUnits FROM `repair`
        INNER JOIN vehicles ON repair.vehicleId = vehicles.id
        WHERE garageId = ? AND repair.userId = ?
        ORDER BY `date` DESC');

        $query->execute(array($id, $this->uid));
        return $query->fetchAll();
    }

    public function getGarageRepairs($id) {
        $data = $this->findGarageRepairs($id);

        $repairs = [];
        foreach($data as $r) {
            $repair = $r;
            $repair['totalPrice'] = floatval($r['totalPrice']);
            $repair['odo'] = floatval($r['odo']);
            $repair['odo2'] = floatval($r['odo2']);
            $repairs[] = $repair;
        }
        return $repairs;
    }

}