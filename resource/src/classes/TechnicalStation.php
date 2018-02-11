<?php
class TechnicalStation {

    public $db;
    private $uid;

    public function __construct($db, $uid) {
        $this->db = $db;
        $this->uid = $uid;
    }

    public function getStations() {
        $query = $this->db->prepare('SELECT id, name, address, city, zipCode, phone, web, notes 
            FROM station
            WHERE userId = ?
            ORDER BY name ASC');
        $query->execute(array($this->uid));
        return $query->fetchAll();
    }

    private function insertStation($d) {
        $query = $this->db->prepare('INSERT INTO station (name, address, city, zipCode, phone, web, notes, userId)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
        $query->execute(array($d->name, $d->address, $d->city, $d->zipCode, $d->phone,
        $d->web, $d->notes, $this->uid));
    }

    private function updateStation($d) {
        $query = $this->db->prepare('UPDATE station SET name = ?, address = ?, city = ?, zipCode = ?, phone = ?, web = ?, notes = ?
        WHERE id = ? AND userId = ?');
        $query->execute(array($d->name, $d->address, $d->city, $d->zipCode, $d->phone, $d->web, $d->notes, $d->id, $this->uid));
    }

    public function update($data) {
        if ($data->id) {
            $this->updateStation($data);
        } else {
            $this->insertStation($data);
        }
    }

    public function deleteStation($id) {
        $query = $this->db->prepare('DELETE FROM station WHERE id = ? AND userId = ?');
        $query->execute(array($id, $this->uid));
    }

}