<?php
require 'Dto/CostPageDto.php';
class Cost {

    public $db;

    public $first = false;
    public $last = false;
    public $totalElements = 0;
    public $totalPages = 0;
    public $number = 0;
    public $numberOfElements = 0;
    public $size = 0;
    public $sort = null;

    private $uid;

    public function __construct($db, $uid) {
        $this->db = $db;
        $this->uid = $uid;
    }

    private function insertCosts($d) {
        $query = $this->db->prepare('INSERT INTO costs (vehicleId, category, title, note, quantity, pricePerItem, totalPrice,
        odo, odo2, `date`, userId)
            VALUES (?,?,?,?,?,?,?,?,?,?,?)');
        $query->execute(array($d->vehicleId, $d->category, $d->title, $d->note, $d->quantity, $d->pricePerItem, $d->totalPrice,
        $d->odo, $d->odo2, $d->date, $this->uid));
        $lastId = $this->db->lastInsertId();

        return $lastId;
    }

    private function updateCosts($d) {
        $query = $this->db->prepare('UPDATE costs SET vehicleId = ?, category = ?, title = ?, quantity = ?, pricePerItem = ?,
        totalPrice = ?, odo = ?, odo2 = ?, `date` = ?, note = ? WHERE id = ? AND userId = ?');
        $query->execute(array($d->vehicleId, $d->category, $d->title, $d->quantity, $d->pricePerItem, $d->totalPrice,
            $d->odo, $d->odo2, $d->date, $d->note, $d->id, $this->uid));
    }

    public function saveCosts($d) {
        if (!$d->quantity) {$d->quantity = 0;}
        if (!$d->pricePerItem) {$d->pricePerItem = 0;}
        if (!$d->totalPrice) {$d->totalPrice = 0;}
        if (!$d->odo) {$d->odo = 0;}
        if (!$d->odo2) {$d->odo2 = 0;}

        if ($d->id) {
            $this->updateCosts($d);
        } else {
            $id = $this->insertCosts($d);
            $d->id = $id;
        }
    }

    private function _getNumberOfCosts($id, $filter = null) {
        $query = $this->db->prepare('SELECT COUNT(id) AS count FROM costs WHERE vehicleId=? AND userId = ? '
            . $this->_prepareFilter($filter)
            . $this->_prepareQuery());

        $query->execute(array($id, $this->uid));
        $r = $query->fetch();
        return $r['count'];
    }

    private function _prepareFilter($f = null) {
        if (!$f || !$f->category) return "";

        return "AND category = ".$f->category;
        // if (count($f->categories) == 0) return "";

        // $stringified = "AND (0";

        // foreach ($f->categories as $c) {
        //     $stringified .= " OR category.id = '".$c."'";
        // }
        // return $stringified.")";
    }

    private function _prepareQuery() {
        if (!$_REQUEST['q']) return "";

        return " AND (costs.title LIKE '%".$_REQUEST['q']."%') ";
    }

    private function findAllCosts($id) {

        $q = 'SELECT costs.id, vehicleId, category, costs.title, note, quantity, pricePerItem, totalPrice,
            odo, odo2, `date`, category.id AS cId, category.title AS cTitle, category.description AS
            cDescription, category.color AS cColor
            FROM costs
            INNER JOIN category ON costs.category = category.id
            WHERE vehicleId = ? AND costs.userId = ?
            ORDER BY `date` DESC';

        $query = $this->db->prepare($q);
        $query->execute(array($id, $this->uid));
        $result = $query->fetchAll();

        return $result;
    }

    private function findCosts($id, $filter) {

        $this->number = isset($_REQUEST['page']) ? $_REQUEST['page'] : 0;
        $this->size = isset($_REQUEST['size']) ? $_REQUEST['size'] : 5;
        $this->totalElements = $this->_getNumberOfCosts($id, $filter);
        $this->totalPages = ceil($this->totalElements / $this->size);
        $this->first = $this->number > 0 ? false : true;
        $this->last = $this->number == $this->totalPages - 1 ? true : false;

        $fromItem = $this->number * $this->size;
        $limit = "LIMIT " . $fromItem . ', ' .$this->size;


        $q = 'SELECT costs.id, vehicleId, category, costs.title, note, quantity, pricePerItem, totalPrice,
            odo, odo2, `date`, category.id AS cId, category.title AS cTitle, category.description AS
            cDescription, category.color AS cColor
            FROM costs
            INNER JOIN category ON costs.category = category.id
            WHERE vehicleId = ? AND costs.userId = ? '
            .$this->_prepareFilter($filter)
            .$this->_prepareQuery()
            .' ORDER BY `date` DESC '
            . $limit;

        $query = $this->db->prepare($q);

        // $query = $this->db->prepare('SELECT costs.id, vehicleId, category, costs.title, note, quantity, pricePerItem, totalPrice,
        // odo, odo2, `date`, category.id AS cId, category.title AS cTitle, category.description AS
        // cDescription, category.color AS cColor
        // FROM costs
        // INNER JOIN category ON costs.category = category.id
        // WHERE vehicleId = ? ORDER BY `date` DESC');
        $query->execute(array($id, $this->uid));

        $result = $query->fetchAll();
        $this->numberOfElements = count($result);

        return $result;
    }

    public function getCostStats($id) {

        $raw = $this->findAllCosts($id);

        if (count($raw) > 0) {

            $data = $this->getCosts($id, $raw, null);

            $count = 0;
            $totalPrice = 0;
            $avgPrice = 0;

            foreach($data as $v) {
                $count += 1;
                $totalPrice += $v['totalPrice'];
            }

            $avgPrice = $count > 0 ? round($totalPrice / $count, 2) : 0;

            return array(
                array(
                    'value' => $count,
                    'label' => 'Celkový počet nákladů',
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
        } else {
            return null;
        }
    }

    public function getPageableCosts($id, $filter) {

        $raw = $this->findCosts($id, $filter);

        $data = $this->getCosts($id, $raw, null);

        return new CostPageDto($data, $this->first, $this->last, $this->number,
        $this->totalElements, $this->totalPages,
        $this->numberOfElements,
        $this->size,
        $this->sort);
    }

    public function getCosts($id, $data, $filter = null) {
        if ($id) {
            // $costs = $this->findCosts($id, $filter);
            $costs = $data;
            $all = array();
            $data = array();
            foreach($costs as $v) {
                $category = array(
                    'id' => $v['cId'],
                    'title' => $v['cTitle'],
                    'description' => $v['cDescription'],
                    'color' => $v['cColor']
                );

                $cost = array(
                    'id' => $v['id'],
                    'vehicleId' => $v['vehicleId'],
                    'category' => $category,
                    'title' => $v['title'],
                    'note' => $v['note'],
                    'quantity' => intval($v['quantity']),
                    'pricePerItem' => $v['pricePerItem'],
                    'totalPrice' => floatval($v['totalPrice']),
                    'odo' => floatval($v['odo']),
                    'odo2' => floatval($v['odo2']),
                    'date' => $v['date']
                );
                array_push($all, $cost);
            }
            // $json = json_encode($all);
            // echo $json;
            // return $all;

            return $all;
        } else {
            // echo json_encode(array());
            return [];
        }
    }

    public function getCost($id) {
        return $this->findCost($id);
    }

    private function findCost($id) {
        $query = $this->db->prepare('SELECT costs.id, vehicleId, category, costs.title, note, quantity, pricePerItem, totalPrice,
        odo, odo2, `date`, category.id AS cId, category.title AS cTitle, category.description AS
        cDescription, category.color AS cColor
        FROM costs
        INNER JOIN category ON costs.category = category.id
        WHERE costs.id = ? AND costs.userId = ? ORDER BY `date` DESC');
        $query->execute(array($id, $this->uid));

        return $query->fetch();
    }
    
    public function delete($id) {
        $query = $this->db->prepare('DELETE FROM costs WHERE id = ? AND userId = ?');
        $query->execute(array($id, $this->uid));
    }

    private function findTotalFuelCosts($id) {
        $query = $this->db->prepare('SELECT SUM(price) AS price FROM fuel WHERE vehicleId = ? AND userId = ?');
        $query->execute(array($id, $this->uid));
        return $query->fetch();
    }

    private function findTotalCostsCosts($id) {
        $query = $this->db->prepare('SELECT SUM(totalPrice) AS price FROM costs WHERE vehicleId = ? AND userId = ?');
        $query->execute(array($id, $this->uid));
        return $query->fetch();
    }

    private function findTotalTireCosts($id) {
        $query = $this->db->prepare('SELECT SUM(totalPrice) AS price FROM tires WHERE vehicleId = ? AND userId = ?');
        $query->execute(array($id, $this->uid));
        return $query->fetch();
    }

    private function findTotalMaintenanceCosts($id) {
        $query = $this->db->prepare('SELECT SUM(totalPrice) AS price FROM repair WHERE vehicleId = ? AND userId = ?');
        $query->execute(array($id, $this->uid));
        return $query->fetch();
    }

    private function findTotalTksCosts($id) {
        $query = $this->db->prepare('SELECT SUM(price) AS price FROM technical_inspection WHERE vehicleId = ? AND userId = ?');
        $query->execute(array($id, $this->uid));
        return $query->fetch();
    }

    public function getAllCosts($id) {
        $fuel = $this->findTotalFuelCosts($id);
        $costs = $this->findTotalCostsCosts($id);
        $tires = $this->findTotalTireCosts($id);
        $maintenance = $this->findTotalMaintenanceCosts($id);
        $tks = $this->findTotalTksCosts($id);

        return array(
            'fuel' => round($fuel['price'], 1),
            'costs' => round($costs['price'], 1),
            'tires' => round($tires['price'], 1),
            'maintenance' => round($maintenance['price'], 1),
            'tks' => round($tks['price'], 1),
            'total' => round($fuel['price'], 1) + round($costs['price'], 1) + round($tires['price'], 1)
                + round($maintenance['price'], 1) + round($tks['price'], 1)
        );
    }

    public function getCostsByCategory($id) {
        $data = $this->findCostsByCategory($id);

        $series = [];
        foreach($data as $d) {
            $series[] = array(
                'name' => $d['title'],
                'value' => floatval($d['price'])
            );
        }

        return $series;
    }

    private function findCostsByCategory($id) {
        $q = $this->db->prepare('SELECT category.title, SUM(totalPrice) as price
            FROM `costs`
            INNER JOIN category ON costs.category = category.id
            WHERE costs.vehicleId = ? AND costs.userId = ?
            GROUP BY category');
        $q->execute(array($id, $this->uid));
        return $q->fetchAll();
    }
}
