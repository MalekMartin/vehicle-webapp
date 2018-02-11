<?php
// require("Seller.php");
// require('Buyer.php');
// require('Engine.php');
class Info {

    private $db;
    private $seller;
    private $buyer;
    private $engine;
    private $uid;

    public function __construct($db, $uid) {
        $this->db = $db;
        $this->seller = new Seller($db, $uid);
        $this->buyer = new Buyer($db, $uid);
        $this->engine = new Engine($db, $uid);
        $this->uid = $uid;
    }

    private function findInfo($id) {
        $query = $this->db->prepare('SELECT vehicles.id, brand, model, manufactureYear, spz, previousOwners,
        vehicles.type, notes, units, subUnits, tankCapacity,
        (CASE WHEN files.id > 0 THEN true ELSE false END) AS hasImage
        FROM vehicles LEFT JOIN files ON vehicles.id = files.vehicleid WHERE vehicles.id = ? AND vehicles.userId = ?');
        $query->execute(array($id, $this->uid));
        return $query->fetch();
    }

    public function getInfo($id) {
        $info = $this->findInfo($id);

        if ($info && isset($info['id'])) {
            $info['manufactureYear'] = isset($info['manufactureYear']) ? floatval($info['manufactureYear']) : null;
            $info['previousOwners'] = isset($info['previousOwners']) ? floatval($info['previousOwners']) : null;
            $info['subUnits'] = isset($info['subUnits']) ? $info['subUnits'] : null;
            $info['tankCapacity'] = isset($info['tankCapacity']) ? floatval($info['tankCapacity']) : null;
            $info['hasImage'] = isset($info['hasImage']) && $info['hasImage'] == '1' ? true : false;

            $d = array(
                "info" => $info,
                "engine" => $this->engine->getEngine($id),
                "buyer" => $this->buyer->getBuyer($id),
                "seller" => $this->seller->getSeller($id)
            );

            return $d;
        } else {
            return null;
        }
    }

    public function updateInfo($i) {
        $query = $this->db->prepare('UPDATE vehicles SET
            model = ?,
            brand = ?,
            manufactureYear = ?,
            spz = ?,
            previousOwners = ?,
            type = ?,
            notes = ?
            WHERE id = ? AND userId = ?');
        $query->execute(array(
            $i->model, $i->brand, $i->manufactureYear, $i->spz, $i->previousOwners, $i->type, $i->notes, $i->id, $this->uid
        ));
        // Events::add($i->vehicleId, 'UPDATE', 'Upraveny obecné informace o vozidle',$this->part);
    }

    public function update($d) {
        $this->updateInfo($d);
    }


}