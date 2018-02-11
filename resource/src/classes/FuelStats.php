<?php

class FuelStats {

    public $db;

    public function __construct($db) {
        $this->db = $db;
    }

    private function findFuelings($id) {
        $query = $this->db->prepare('SELECT id, `date`,
            quantity, pricePerLiter, price, mileage,
            engineHours, fullTank, note, vehicleId
            FROM fuel WHERE vehicleId = ?
            ORDER BY `date` DESC');
        $query->execute(array($id));
        return $query->fetchAll();
    }
}