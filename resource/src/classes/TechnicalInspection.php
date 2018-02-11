<?php
require 'Dto/PageDto.php';
require 'Dto/TkDto.php';

class TechnicalInspection {

    public $db;
    private $uid;

    public $first = false;
    public $last = false;
    public $totalElements = 0;
    public $totalPages = 0;
    public $number = 0;
    public $numberOfElements = 0;
    public $size = 0;
    public $sort = null;

    public function __construct($db, $uid) {
        $this->db = $db;
        $this->uid = $uid;
    }

    private function insertInspection($d) {
        $query = $this->db->prepare('INSERT INTO technical_inspection (vehicleId, `date`, expirationDate, repeated, note, price, stationId,
        odo, odo2, userId)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        $query->execute(array($d->vehicleId, $d->date, $d->expirationDate, $d->repeated,
        $d->note, $d->price, $d->stationId, $d->odo, $d->odo2, $this->uid));
    }

    private function updateInspection($d) {
        $query = $this->db->prepare('UPDATE technical_inspection SET
            `date` = ?, expirationDate = ?, repeated = ?, note = ?, price = ?, stationId = ?, odo = ?, odo2 = ?
            WHERE id = ? AND userId = ?');
        $query->execute(array($d->date, $d->expirationDate, $d->repeated,
            $d->note, $d->price, $d->stationId, $d->odo, $d->odo2, $d->id, $this->uid));
    }

    public function update($data) {
        if (!$data->repeated) {$data->repeated = 0;}
        if (!$data->price) {$data->price = 0;}
        if (!$data->stationId) {$data->stationId = null;}

        if ($data->id) {
            $this->updateInspection($data);
        } else {
            $this->insertInspection($data);
        }
    }

    public function getInspections($id) {
        $res = $this->findInspections($id);

        $results = array();
        foreach($res as $v) {
            $results[] = new TkDto($v);
            // $item = array(
            //     'id' => $v['id'],
            //     'vehicleId' => $v['vehicleId'],
            //     'date' => $v['date'],
            //     'expirationDate' => $v['expirationDate'],
            //     'repeated' => intval($v['repeated']),
            //     'note' => $v['note'],
            //     'price' => $v['price'],
            //     'name' => $v['name'],
            //     'stationId' => $v['stationId'],
            //     'odo' => $v['odo'],
            //     'odo2' => $v['odo2']
            // );
            // array_push($all, $item);

        }
        // return $all;
        return new PageDto($results,
            $this->first,
            $this->last,
            $this->number,
            $this->totalElements,
            $this->totalPages,
            $this->numberOfElements,
            $this->size,
            $this->sort
        );
    }

    private function _getNumberOfTks($id) {
        $query = $this->db->prepare('SELECT COUNT(id) AS count FROM technical_inspection WHERE vehicleId = ?');
        $query->execute(array($id));
        $res = $query->fetch();
        return $res['count'];
    }

    private function findInspections($id) {

        $this->number = isset($_REQUEST['page']) ? $_REQUEST['page'] : 0;
        $this->size = isset($_REQUEST['size']) ? $_REQUEST['size'] : 5;
        $this->totalElements = $this->_getNumberOfTks($id);
        $this->totalPages = ceil($this->totalElements / $this->size);
        $this->first = $this->number > 0 ? false : true;
        $this->last = $this->number == $this->totalPages - 1 ? true : false;

        $fromItem = $this->number * $this->size;
        $limit = "LIMIT " . $fromItem . ', ' .$this->size;

        $query = $this->db->prepare('SELECT technical_inspection.id, technical_inspection.vehicleId,`date`, 
        expirationDate, repeated, note, price, station.name, station.id as stationId, odo, odo2
        FROM technical_inspection
        LEFT JOIN station ON technical_inspection.stationId = station.id
        WHERE vehicleId = ? AND technical_inspection.userId = ?
        ORDER BY `date` DESC');
        $query->execute(array($id, $this->uid));

        $result = $query->fetchAll();
        $this->numberOfElements = count($result);

        return $result;
    }

    private function findInspection($id) {
        $query = $this->db->prepare('SELECT technical_inspection.id, technical_inspection.vehicleId,`date`, 
        expirationDate, repeated, note, price, station.name, station.id as stationId, odo, odo2
        FROM technical_inspection
        LEFT JOIN station ON technical_inspection.stationId = station.id
        WHERE technical_inspection.id = ? AND technical_inspection.userId = ?');
        $query->execute(array($id, $this->uid));

        return $query->fetch();
    }

    public function getInspection($id) {
        $result = $this->findInspection($id);
        $result['repeated'] = $result['repeated'] == 1 ? true : false;
        return $result;
    }

    public function delete($id) {
        $query = $this->db->prepare('DELETE FROM technical_inspection WHERE id = ? AND userId = ?');
        $query->execute(array($id, $this->uid));
    }
}