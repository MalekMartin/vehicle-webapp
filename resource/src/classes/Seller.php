<?php
class Seller {

    private $db;
    private $uid;
    
    public function __construct($db, $uid) {
        $this->db = $db;
        $this->uid = $uid;
    }

    public function insertEmptySeller($id) {
        $query = $this->db->prepare('INSERT INTO seller (vehicleId, userId) VALUES (?,?)');
        $query->execute(array($id, $this->uid));
    }

    public function getSeller($id) {
        $query = $this->db->prepare('SELECT vehicleId, company, address, city, zipCode, phone, email, contactPerson, notes, `date`,
            price, odo, odo2 FROM seller
            WHERE vehicleId = ? AND userId = ?');
        $query->execute(array($id, $this->uid));
        $d = $query->fetch();

        if (!!$d) {
            $d['price'] = floatval($d['price']);
            return $d;
        }
        return null;
    }

    private function updateSeller($d) {

        if (!$d->odo) $d->odo = 0;
        if (!$d->odo2) $d->odo2 = 0;

        $query = $this->db->prepare('UPDATE seller SET
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
        return $d;
        // Events::add($d->vehicleId, 'UPDATE', 'Upraven prodejce',$this->part);
    }

    public function update($d) {

        $this->updateSeller($d);
    }

}