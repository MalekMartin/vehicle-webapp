<?php
class Buyer {

    public $db;
    private $uid;

    public function __construct($db, $uid) {
        $this->db = $db;
        $this->uid = $uid;
    }

    public function insertEmptyBuyer($id) {
        $query = $this->db->prepare('INSERT INTO buyer (vehicleId, userId) VALUES (?,?)');
        $query->execute(array($id, $this->uid));
    }

    public function getBuyer($id) {
        $query = $this->db->prepare('SELECT vehicleId, company, address, city, zipCode, phone, email, contactPerson, notes, `date`, price, odo, odo2
        FROM buyer
        WHERE vehicleId = ? AND userId = ?');
        $query->execute(array($id,$this->uid));
        $d = $query->fetch();

        if (!!$d) {
            $d['price'] = floatval($d['price']);
            return $d;
        }
        return null;
    }

    private function updateBuyer($d) {

        if (!$d->odo) $d->odo = 0;
        if (!$d->odo2) $d->odo2 = 0;

        $query = $this->db->prepare('UPDATE buyer SET
            company = ?,
            address = ?,
            city = ?,
            zipCode = ?,
            phone = ?,
            email = ?,
            contactPerson = ?,
            notes = ?,
            `date` = ?,
            price = ?,
            odo = ?,
            odo2 = ?
            WHERE vehicleId = ? AND userId = ?
            ');
        $query->execute(array(
                $d->company, $d->address, $d->city, $d->zipCode, $d->phone, $d->email, $d->contactPerson,
                $d->notes, $d->date, $d->price, $d->odo, $d->odo2, $d->vehicleId, $this->uid
            )
        );

        // return $res;
    }

    public function update($d) {
        $res = $this->updateBuyer($d);
    }

}