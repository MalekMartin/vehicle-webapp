<?php
require 'Dto/PageDto.php';

class Maintenance {

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

    private $statuses = array(
        'IN_PROGRESS' => 0,
        'CANCELED' => 1,
        'DONE' => 2
    );

    private function getStatus($status) {
        
        foreach ($this->statuses as $k => $v ) {
            if ($v == $status) {
                return $k;
            }
        }
        return;
    }

    private function findMaintenances($id, $filter = null) {

        $this->number = isset($_REQUEST['page']) ? $_REQUEST['page'] : 0;
        $this->size = isset($_REQUEST['size']) ? $_REQUEST['size'] : 5;
        $this->totalElements = $this->_getNumberOfCosts($id, $filter);
        $this->totalPages = ceil($this->totalElements / $this->size);
        $this->first = $this->number > 0 ? false : true;
        $this->last = $this->number == $this->totalPages - 1 ? true : false;
        
        $fromItem = $this->number * $this->size;
        $limit = " LIMIT " . $fromItem . ', ' .$this->size;

        $query = $this->db->prepare('SELECT maintenance.id AS mId, maintenance.odo AS mOdo, maintenance.odo2 AS mOdo2, maintenance.`date`, maintenance.notes,
        status, price, intervals.id AS iId, intervals.name, intervals.odo AS iOdo, intervals.odo2 AS iOdo2, intervals.months,
        intervals.note, maintenance.vehicleId, maintenance.odoDone, maintenance.odo2Done, maintenance.dateDone,
        (SELECT MAX(odo) FROM fuel WHERE vehicleId = ?) AS currentOdo,
        (SELECT MAX(odo2) FROM fuel WHERE vehicleId = ?) AS currentOdo2,
        repair.id AS repairId, repair.title AS repairTitle
        FROM maintenance
        JOIN intervals ON maintenance.intervalId = intervals.id
        LEFT JOIN repair ON maintenance.repairId = repair.id
        WHERE maintenance.vehicleId = ?
        AND maintenance.userId = ?'
        . $this->_prepareFilter($filter)
        . 'ORDER BY maintenance.`date` DESC, maintenance.id DESC'
        . $limit);
        $query->execute(array($id, $id, $id, $this->uid));

        $result = $query->fetchAll();
        $this->numberOfElements = count($result);

        return $result;
    }

    private function _getNumberOfCosts($id, $filter = null) {
        $query = $this->db->prepare('SELECT COUNT(id) AS count FROM maintenance WHERE vehicleId = ?'
            . $this->_prepareFilter($filter));
        $query->execute(array($id));
        $r = $query->fetch();
        return $r['count'];
    }

    private function _prepareFilter($filter = null) {
        if (!$filter) return "";

        $f = "";

        if (isset($filter->status) && $filter->status != '') {
            $f .= " AND maintenance.status = " . $this->statuses[$filter->status] . " ";
        }

        if (isset($filter->interval) && $filter->interval != '') {
            $f .= " AND maintenance.intervalId = " . $filter->interval . " ";
        }

        return $f;
    }

    public function getMaintenances($id, $filter = null) {
        $data = $this->findMaintenances($id, $filter);
        $all = array();
        
        foreach($data as $s) {
            $int = array(
                'id' => $s['iId'],
                'vehicleId' => $s['vehicleId'],
                'name' => $s['name'],
                'odo' => floatval($s['iOdo']),
                'odo2' => round(floatval($s['iOdo2']), 1),
                'note' => $s['note'],
                'months' => intval($s['months'])
            );

            $current = array(
                'odo' => floatval($s['currentOdo']),
                'odo2' => round(floatval($s['currentOdo2']), 1)
            );

            $endings = array(
                'odo' => $s['mOdo'] + $s['iOdo'],
                'odo2' => $s['mOdo2'] + $s['iOdo2'],
                'date' => date('Y-m-d\TH:i:s\Z', strtotime("+".$s['months']." months", strtotime($s['date'])))
            );

            $m = array(
                'id' => $s['mId'],
                'vehicleId' => $s['vehicleId'],
                'odo' => floatval($s['mOdo']),
                'odo2' => round(floatval($s['mOdo2']), 1),
                'date' => $s['date'],
                'price' => floatval($s['price']),
                'notes' => $s['notes'],
                'status' => $this->getStatus($s['status']),
                'interval' => $int,
                'currents' => $current,
                'expirations' => $endings,
                'odoDone' => floatval($s['odoDone']),
                'odo2Done' => round(floatval($s['odo2Done']), 1),
                'dateDone' => $s['dateDone'],
                'repairId' => $s['repairId'],
                'repairTitle' => $s['repairTitle']
            );
            array_push($all, $m);
        }
        // return $all;
        return new PageDto($all, $this->first,
            $this->last, $this->number,
            $this->totalElements,
            $this->totalPages,
            $this->numberOfElements,
            $this->size,
            $this->sort);
    }

    private function insertMaintenance($d) {
        
        $d->odo = $d->odo ? $d->odo : 0;
        $d->odo2 = $d->odo2 ? $d->odo2 : 0;

        $status = $this->statuses['IN_PROGRESS'];

        // Db::query('INSERT INTO maintenance (vehicleId, intervalId, mileage, engineHours, `date`, mileageDone, engineHoursDone, dateDone, price, notes, status) VALUES (?,?,?,?,?,?,?,?,?,?,?)', array($d->vehicleId, $d->intervalId, $d->mileage, $d->engineHours, $d->date, $d->mileageDone, $d->engineHoursDone, $d->dateDone, $d->price, $d->notes, $status));

        $query = $this->db->prepare('INSERT INTO maintenance (vehicleId, intervalId, odo, odo2, `date`, status, userId)
        VALUES (?,?,?,?,?,?,?)');
        $query->execute(array($d->vehicleId, $d->intervalId, $d->odo, $d->odo2, $d->date, $status, $this->uid));
    }

    private function updateMantenance($d) {
        $query = $this->db->prepare('UPDATE maintenance SET intervalId = ?, odo = ?, odo2 = ?, `date` = ? WHERE id = ? AND userId = ?');
        $query->execute(array($d->intervalId, $d->odo, $d->odo2, $d->date, $d->id, $this->uid));
    }

    public function saveMaintenance($d) {
        if (!$d->id) {
            $this->insertMaintenance($d);
        }

        if ($d->id) {
            $this->updateMantenance($d);
        }
    }

    public function finishMaintenance($d) {
        $query = $this->db->prepare('UPDATE maintenance
            SET odoDone = ?, odo2Done = ?, dateDone = ?,
            notes = ?, status = ?, garageId = ?
            WHERE id IN (' . implode(',',$d->ids) . ') AND status = ? AND userId = ?');
        $query->execute(array($d->odo, $d->odo2, $d->date, $d->notes, 2, $d->garageId, 0, $this->uid));
        // // $query = $this->db->prepare('UPDATE maintenance SET mileageDone = ?, engineHoursDone = ?, dateDone = ?, price = ?, notes = ?, status = ?, garageId = ? WHERE id = ?');
        // // $query->execute(array($d->mileage, $d->engineHours, $d->date, $d->price, $d->notes, 2, $d->garageId, $d->id));

        $canAddRepair = false;
        if ($d->repeat) {
            foreach($d->ids as $id) {
                $main = $this->findMaintenanceById($id);
                if ($main['vehicleId']) {
                    $this->repeatMaintenance($d, $main['vehicleId'], $main['intervalId']);
                    $canAddRepair = true;
                }
            }
        }

        $repairId = '';
        if ($d->garageId && $canAddRepair) {
            $repairId = $this->addIntoRepairs($d);
        }

        $query = $this->db->prepare('UPDATE maintenance
        SET repairId = ?
        WHERE id IN (' . implode(',', $d->ids) . ') AND status = ? AND userId = ?');
        $query->execute(array($repairId, 2, $this->uid));

        return $repairId;
    }

    private function addIntoRepairs($d) {
        // $query = $this->db->prepare('INSERT INTO repair (vehicleId, title, mileage, engineHours, `date`, garageId, totalPrice, maintenanceId)
        //     VALUES (?,?,?,?,?,?,?,?)');
        // $query->execute(array($d->vehicleId, $d->repairTitle, $d->mileage, $d->engineHours, $d->date, $d->garageId, $d->price, $d->id));
        // return $this->db->lastInsertId();
        $query = $this->db->prepare('INSERT INTO repair (vehicleId, title, odo, odo2, `date`, garageId, totalPrice, userId)
            VALUES (?,?,?,?,?,?,?,?)');
        $query->execute(array($d->vehicleId, $d->repairTitle, $d->odo, $d->odo2, $d->date, $d->garageId, $d->price, $this->uid));
        return $this->db->lastInsertId();
    }

    private function findMaintenanceById($id) {
        $query = $this->db->prepare('SELECT vehicleId, intervalId FROM maintenance WHERE id = ? AND status = ? AND userId = ?');
        $query->execute(array($id, 2, $this->uid));
        return $query->fetch();
    }

    private function repeatMaintenance($done, $vehicleId, $intervalId) {
        $query = $this->db->prepare('INSERT INTO maintenance (vehicleId, intervalId, odo, odo2, `date`, status, userId)
        VALUES (?,?,?,?,?,?,?)');
        $query->execute(array($vehicleId, $intervalId, $done->odo, $done->odo2, $done->date, 0, $this->uid));
    }

    public function cancelMaintenance($ids) {

        $q = "UPDATE maintenance SET status = 1
            WHERE status = 0 AND id IN ("
            . $this->_arrayIdsToQuery($ids)
            . ") AND userId = ?";

        $query = $this->db->prepare($q);
        $query->execute(array($this->uid));
    }

    public function deleteMaintenance($data) {
        $query = $this->db->prepare('DELETE FROM maintenance
            WHERE id IN (' .$this->_arrayIdsToQuery($data) .') AND userId = ?');
        $query->execute(array($this->uid));
    }

    private function _arrayIdsToQuery($data) {
        $ids = '';
        foreach($data as $d) {
            if ($ids) {
                $ids .= ','.$d; 
            } else {
                $ids .= $d; 
            }
        }
        return $ids;
    }

    private function findInProgress($id) {
        $q = $this->db->prepare('SELECT m.odo, m.odo2, `date`, i.odo AS iOdo, i.odo2 AS iOdo2, i.months
            FROM maintenance AS m INNER JOIN intervals AS i ON m.intervalId = i.id
            WHERE m.vehicleId = ? AND m.status = ?');
        $q->execute(array($id, 0));
        return $q->fetchAll();
    }

    public function getExpiredCount($id) {
        $odos = $this->getCurrentOdo($id);
        $odo = $odos['odo'];
        $odo2 = $odos['odo2'];
        $date = strtotime(date('Y-m-d\TH:i:s\Z'));

        $count = 0;
        $data = $this->findInProgress($id);
        foreach($data as $d) {
            $o = floatval($d['odo']) + floatval($d['iOdo']);
            $o2 = floatval($d['odo2']) + floatval($d['iOdo2']);
            $idate = strtotime(date('Y-m-d\TH:i:s\Z', strtotime('+3 months', strtotime($d['date']))));

            if ($o <= $odo || $o2 <= $odo2 || $idate <= $date) {
                $count += 1;
            }
        }
        return array('count' => $count);
    }

    private function getCurrentOdo($id) {
        $q = $this->db->prepare('SELECT MAX(odo) AS odo, MAX(odo2) AS odo2 FROM fuel WHERE vehicleId = ?');
        $q->execute(array($id));
        return $q->fetch();
    }
}
