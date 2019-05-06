<?php
class Interval {

    public $db;
    private $uid;

    public function __construct($db, $uid) {
        $this->db = $db;
        $this->uid = $uid;
    }

    private function insertInterval($d) {

        $d->odo = $d->odo ? $d->odo : 0;
        $d->odo2 = $d->odo2 ? $d->odo2 : 0;
        $d->months = $d->months ? $d->months : 0;

        $query = $this->db->prepare('INSERT INTO intervals (vehicleId, name, odo, odo2, months, note, userId)
        VALUES (?,?,?,?,?,?,?)');
        $query->execute(array($d->vehicleId, $d->name, $d->odo, $d->odo2, $d->months, $d->note, $this->uid));
        $lastId = $this->db->lastInsertId();
        $d->id = $lastId;
        return $d;
    }

    private function updateInterval($d) {
        $d->odo = $d->odo ? $d->odo : 0;
        $d->odo2 = $d->odo2 ? $d->odo2 : 0;
        $d->months = $d->months ? $d->months : 0;

        $query = $this->db->prepare('UPDATE intervals SET name = ?, odo = ?, odo2 = ?, months = ?, note = ? WHERE id = ? AND userId = ?');
        $query->execute(array($d->name, $d->odo, $d->odo2, $d->months, $d->note, $d->id, $this->uid));
        return $d;
    }

    public function saveInterval($d) {
        if ($d->id) {
            return $this->updateInterval($d);
        } else {
            return $this->insertInterval($d);
        }
    }

    private function findIntervals($id) {
        $query = $this->db->prepare('SELECT i.id, i.vehicleId, i.name, i.odo, i.odo2, i.months, i.note,
        x.id As mId, x.odo as mKm, x.odo2 as mMh, x.date as mDate
        FROM intervals i 
        LEFT JOIN (
            SELECT m.id, m.odo, m.odo2, m.date, m.intervalId
            FROM maintenance m
            JOIN intervals i2 ON m.intervalId = i2.id
            WHERE
            m.status = ? AND
                m.vehicleId = ?
            
        ) x ON x.intervalId = i.id
        WHERE i.vehicleId = ? AND userId = ?
        ORDER BY i.name');
        $query->execute(array(0,$id,$id,$this->uid));

        $old_query = 'SELECT intervals.id, intervals.vehicleId, intervals.name, intervals.odo, intervals.odo2, intervals.months,
        intervals.note,
        (
            SELECT maintenance.id
            FROM maintenance 
            WHERE maintenance.status = ? 
                AND maintenance.intervalId = intervals.id 
                AND maintenance.vehicleId = ?
            ORDER BY maintenance.date DESC LIMIT 1
        ) AS status
        FROM intervals 
        WHERE vehicleId = ? AND userId = ?';

        return $query->fetchAll();
    }

    public function getINtervals($id) {
        $data = $this->findIntervals($id);
        $all = array();

        $cur = $this->getCurrentMileage($id);
        $odo = $cur['odo'];
        $hours = $cur['odo2'];
        
        foreach($data as $s) {
            $km = $s['mKm'];
            $mh = $s['mMh'];
            $date = $s['mDate'];

            $km = $km + $s['odo'];
            $mh = $mh + $s['odo2'];
            $date = strtotime(date("Y-m-d", strtotime($date)) . " +".$s['months']." MONTH");

            $expired = false;
            if ($s['mId']) {
                if ($km < $odo && $s['odo'] > 0) $expired = true;
                if ($mh < $hours  && $s['odo2'] > 0) $expired = true;
                if ($date < strtotime(date('Y-m-d'))  && $s['months'] > 0) $expired = true;
            }

            $int = array(
                'id' => $s['id'],
                'vehicleId' => $s['vehicleId'],
                'name' => $s['name'],
                'odo' => $s['odo'],
                'odo2' => $s['odo2'],
                'note' => $s['note'],
                'months' => $s['months'],
                'inProgress' => $s['mId'] ? true : false,
                'expired' => $expired
            );
            array_push($all, $int);
        }
        return $all;
    }

    public function deleteInterval($id) {
        $query = $this->db->prepare('DELETE FROM intervals WHERE id = ? AND userId = ?');
        $query->execute(array($id, $this->uid));
    }

    private function getCurrentMileage($id) {
        $query = $this->db->prepare('SELECT odo, odo2 FROM fuel WHERE fuel.vehicleId = ? AND userId = ?
            ORDER BY fuel.date DESC LIMIT 1');
        $query->execute(array($id, $this->uid));
        return $query->fetch();
    }
}