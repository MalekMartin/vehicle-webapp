<?php
class Odo {

    private $id; // vehicleId
    private $db;
    private $odo = 0;
    private $odo2 = 0;
    private $units = '';
    private $units2 = '';

    function __construct($db, $id) {
        $this->id = $id;
        $this->db = $db;
    }

    public function getCurrentOdo() {
        $q = $this->db->prepare('SELECT odo, odo2, units, subUnits FROM vehicles WHERE id = ?');
        $q->execute(array($this->id));
        $r = $q->fetch();

        $this->odo = $r['odo'];
        $this->odo2 = $r['odo2'];
        $this->units = $r['units'];
        $this->units2 = $r['subUnits'];
    }

    public function odo() {
        return $this->odo;
    }

    public function odo2() {
        return $this->odo2;
    }

    public function units() {
        return $this->units;
    }

    public function units2() {
        return $this->units2;
    }

    public function updateOdo($o, $o2 = null) {
        $this->getCurrentOdo();
        if ($o > $this->odo) {
            $this->setNewOdo($o, $o2);
        }
    }

    public function onOdoRemove($o, $o2 = null) {
        $this->getCurrentOdo();
        if ($o == $this->odo) {
            $r = $this->findLastTankOdo();
            $this->setNewOdo($r['odo'], $r['odo2']);
        }
    }

    private function setNewOdo($o, $o2 = null) {
        $q = $this->db->prepare('UPDATE vehicles SET odo = ?, odo2 = ? WHERE id = ?');
        $q->execute(array($o, $o2, $this->id));
    }

    private function findLastTankOdo() {
        $q = $this->db->prepare('SELECT MAX(odo) as odo, odo2 FROM fuel WHERE vehicleId = ?');
        $q->execute(array($this->id));
        return $q->fetch();
    }
}