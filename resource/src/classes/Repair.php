<?php
// require 'Dto/PageDto.php';
class Repair {

    private $db;
    private $uid;
    private $maintenances;

    public $first = false;
    public $last = false;
    public $totalElements = 0;
    public $totalPages = 0;
    public $number = 0;
    public $numberOfElements = 0;
    public $size = 0;
    public $sort = null;

    public $taskTypes = ['MATERIAL','WORK','OTHER'];

    public function __construct($db, $uid) {
        $this->db = $db;
        $this->uid = $uid;
        $this->maintenances = new Maintenance($db, $uid);
    }

    private function _prepareQuery() {
        if (!isset($_REQUEST['q']) || !$_REQUEST['q']) return "";

        return " AND (repair.title LIKE '%".$_REQUEST['q']."%') ";
    }

    private function _getNumberOfRepairs($id, $filter = null) {
        $query = $this->db->prepare('SELECT COUNT(id) AS count FROM repair WHERE vehicleId=? '
            . $this->_prepareFilter($filter)
            . $this->_prepareQuery());

        $query->execute(array($id));
        $r = $query->fetch();
        return $r['count'];
    }

    private function _prepareFilter($f = null) {
        if (!$f || !$f->garageId) return "";

        return " AND repair.garageId = ".$f->garageId;
    }

    private function findAllRepairs($id) {
        $query = $this->db->prepare('SELECT repair.id, vehicleId, title, odo, odo2, `date`,
            garageId, totalPrice, repair.notes, garage.name AS garageName, maintenanceId, tax
            FROM repair
            LEFT JOIN garage ON repair.garageId = garage.id
            WHERE vehicleId = ? AND repair.userId = ?
            ORDER BY repair.date DESC');
        $query->execute(array($id, $this->uid));
        return $query->fetchAll();
    }

    public function getStats($id) {
        $raw = $this->findAllRepairs($id);

        $data = $this->getRepairs($id, $raw);

        $count = 0;
        $totalPrice = 0;
        $payedCount = 0;

        foreach($data as $v) {
            $count += 1;
            $payedCount += $v['totalPrice'] > 0 ? 1 : 0;
            $totalPrice += $v['totalPrice'];

        }

        $avgPrice = $payedCount > 0 ? round($totalPrice / $payedCount, 2) : 0;

        return array(
            array(
                'value' => $count,
                'label' => 'Celkový počet',
                'unit' => ''
            ),
            array(
                'value' => $totalPrice,
                'label' => 'Celková cena',
                'unit' => 'Kč'
            ),
            array(
                'value' => $avgPrice,
                'label' => 'Průměrná cena',
                'unit' => 'Kč'
            )
        );
    }

    private function findRepairs($id, $filter = null) {

        $this->number = isset($_REQUEST['page']) ? $_REQUEST['page'] : 0;
        $this->size = isset($_REQUEST['size']) ? $_REQUEST['size'] : 5;
        $this->totalElements = $this->_getNumberOfRepairs($id, $filter);
        $this->totalPages = ceil($this->totalElements / $this->size);
        $this->first = $this->number > 0 ? false : true;
        $this->last = $this->number == $this->totalPages - 1 ? true : false;

        $fromItem = $this->number * $this->size;
        $limit = "LIMIT " . $fromItem . ', ' .$this->size;

        $query = $this->db->prepare('SELECT repair.id, vehicleId, title, odo, odo2, `date`,
            garageId, totalPrice, repair.notes, garage.name AS garageName, maintenanceId, tax
            FROM repair
            LEFT JOIN garage ON repair.garageId = garage.id
            WHERE vehicleId = ? AND repair.userId = ? '
            .$this->_prepareFilter($filter)
            .$this->_prepareQuery()
            .' ORDER BY repair.date DESC '
            . $limit);
        $query->execute(array($id, $this->uid));

        $result = $query->fetchAll();
        $this->numberOfElements = count($result);

        return $result;
    }

    public function getPageableRepairs($id, $filter = null) {
        $raw = $this->findRepairs($id, $filter);

        $data = $this->getRepairs($id, $raw, $filter);

        return new PageDto(
            $data,
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

    public function getRepairs($id, $data, $filter = null) {
        

        $all = array();
        foreach($data as $v) {
            $repair = array(
                'id' => $v['id'],
                'vehicleId' => $v['vehicleId'],
                'title' => $v['title'],
                'odo' => floatval($v['odo']),
                'odo2' => floatval($v['odo2']),
                'date' => $v['date'],
                'garageId' => $v['garageId'],
                'garageName' => $v['garageName'],
                'totalPrice' => floatval($v['totalPrice']),
                'notes' => $v['notes'],
                'maintenanceId' => $v['maintenanceId'],
                'tax' => floatval($v['tax']),
                'tasks' => $this->findTasks($v['id'])
            );
            array_push($all, $repair);
        }

        return $all;
    }

    private function findRepair($id) {
        $query = $this->db->prepare('SELECT repair.id, vehicleId, title, odo, odo2, `date`,
            garageId, totalPrice, repair.notes, garage.name AS garageName, maintenanceId, tax
            FROM repair
            LEFT JOIN garage ON repair.garageId = garage.id
            WHERE repair.id = ? AND repair.userId = ?');
        $query->execute(array($id, $this->uid));
        return $query->fetch();
    }

    public function getMaintenancesByRepairId($vehicleId, $repairId) {
        return $this->maintenances->getMaintenancesByRepairId($vehicleId, $repairId);
    }

    public function getRepair($id) {
        $v = $this->findRepair($id);

        $repair = array(
            'id' => $v['id'],
            'vehicleId' => $v['vehicleId'],
            'title' => $v['title'],
            'odo' => floatval($v['odo']),
            'odo2' => floatval($v['odo2']),
            'date' => $v['date'],
            'garageId' => $v['garageId'],
            'garageName' => $v['garageName'],
            'totalPrice' => floatval($v['totalPrice']),
            'notes' => $v['notes'],
            'maintenanceId' => $v['maintenanceId'],
            'tax' => floatval($v['tax'])
            // 'tasks' => $this->findTasks($id)
        );
        return $repair;
    }

    public function findTasks($id) {
         $query = $this->db->prepare('SELECT id, repairId, title, note, quantity, note, price, priceNoTax, `type`
            FROM repair_task WHERE repairId = ? AND userId = ?
            ORDER BY `type`, id');
         $query->execute(array($id, $this->uid));
         $res = $query->fetchAll();
         return $this->_prepareTasks($res);
    }

    private function _prepareTasks($d) {
        return array_map(function($value) {
            $value['type'] = $this->taskTypes[$value['type']];
            return $value;
        }, $d);
    }

    private function insertNewRepair($d) {
        $query = $this->db->prepare('INSERT INTO repair (vehicleId, title, odo, odo2, `date`, garageId, totalPrice, notes, tax, userId)
            VALUES (?,?,?,?,?,?,?,?,?,?)');
        $query->execute(array($d->vehicleId, $d->title, $d->odo, $d->odo2, $d->date, $d->garageId, $d->totalPrice, $d->notes, $d->tax, $this->uid));
    }

    private function updateRepair($d) {
        $query = $this->db->prepare('UPDATE repair SET title = ?, odo =?, odo2 = ?, `date` = ?, garageId = ?, totalPrice = ?, notes = ?, tax = ?
            WHERE id = ? AND userId = ?');
        $query->execute(array($d->title, $d->odo, $d->odo2, $d->date, $d->garageId, $d->totalPrice, $d->notes, $d->tax, $d->id, $this->uid));
    }

    public function update($d) {
        if ($d->id) {
            $this->updateRepair($d);
        } else {
            $this->insertNewRepair($d);
        }
    }

    public function delete($id) {
        $query = $this->db->prepare('DELETE FROM repair WHERE id = ? AND userId = ?');
        $query->execute(array($id, $this->uid));
    }

    public function saveTask($d) {
        if ($d->id) {
            $this->updateTask($d);
        } else {
            $this->insertNewTask($d);
        }
    }

    private function insertNewTask($d) {
        $type = array_search($d->type, $this->taskTypes);
        $query = $this->db->prepare('INSERT INTO repair_task (repairId, title, note, quantity, priceNoTax, price, `type`, userId)
            VALUES (?,?,?,?,?,?,?,?)');
        $query->execute(array($d->repairId, $d->title, $d->note, $d->quantity, $d->priceNoTax, $d->price, $type, $this->uid));
    }

    private function updateTask($d) {
        $type = array_search($d->type, $this->taskTypes);
        $query = $this->db->prepare('UPDATE repair_task SET title = ?, note = ?, quantity = ?, priceNoTax = ?, price = ?, `type` = ?
            WHERE id = ? AND userId = ?');
        $query->execute(array($d->title, $d->note, $d->quantity, $d->priceNoTax, $d->price, $type, $d->id, $this->uid));
    }

    public function deleteTask($id) {
        $query = $this->db->prepare('DELETE FROM repair_task WHERE id = ? AND userId = ?');
        $query->execute(array($id, $this->uid));
    }

}