<?php
class Engine {

    public $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function insertEmptyEngine($id) {
        $query = $this->db->prepare('INSERT INTO engine (vehicleId) VALUES (?)');
        $query->execute(array($id));
    }

    public function getEngine($id) {
        return $this->findEngine($id);
    }

    private function findEngine($id) {
        $query = $this->db->prepare('SELECT displacement, transmission, transmissionType, power, engineType, cylinders,
            fuel, engineOil, fuelOil, dilutionRatio, vehicleId FROM engine WHERE vehicleId = ?');
        $query->execute(array($id));
        $data = $query->fetch();

        $data['displacement'] = floatval($data['displacement']);
        $data['transmission'] = floatval($data['transmission']);
        $data['power'] = floatval($data['power']);
        $data['cylinders'] = floatval($data['cylinders']);

        return $data;
    }

    public function updateEngine($id, $d) {

        $query = $this->db->prepare('UPDATE engine SET
            displacement = ?,
            transmission = ?,
            transmissionType = ?,
            engineType = ?,
            power = ?,
            cylinders = ?,
            fuel = ?,
            fuelOil = ?,
            engineOil = ?,
            dilutionRatio = ?
            WHERE vehicleId = ?
        ');

        $query->execute(array(
            $d->displacement,
            $d->transmission,
            $d->transmissionType,
            $d->engineType,
            $d->power,
            $d->cylinders,
            $d->fuel,
            $d->fuelOil,
            $d->engineOil,
            $d->dilutionRatio,
            $id
        ));
        // Events::add($d->vehicleId, 'UPDATE', 'Upraveny detaily o motoru', $this->part);

        // echo $rawData;
    }
}