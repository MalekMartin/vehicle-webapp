<?php
require 'Dto/FuelDto.php';

class Fuel {

    public $part;
    public $id;
    private $odo;

    public $pageable = array(
        'first' => false,
        'last' => false,
        'totalElements' => 0,
        'totalPages' => 0,
        'number' => 0,
        'numberOfElements' => 0,
        'size' => 0,
        'sort' => null
    );
    
    private $uid;

    public function __construct($db, $vid, $uid) {
        $this->part = "FUEL";
        $this->db = $db;
        $this->uid = $uid;
        $this->id = $vid;
        $this->odo = new Odo($this->db, $vid);
    }

    private function insertFueling($d) {
        $fullTank = !$d->fullTank ? 0 : 1;

        $query = $this->db->prepare('INSERT INTO fuel (vehicleId, `date`, quantity, pricePerLiter, price, odo, odo2, fullTank, note, userId)
                VALUES (?,?,?,?,?,?,?,?,?,?)');

        try {
            $this->db->beginTransaction();
            $res = $query->execute(array($d->vehicleId, $d->date, $d->quantity, $d->pricePerLiter, $d->price, $d->odo, $d->odo2, $fullTank, $d->note, $this->uid));
            $this->odo->updateOdo($d->odo, $d->odo2);
            $this->db->commit();
            return $res;
        } catch (Exception $e) {
            $this->db->rollBack();
            return false;
            throw($e);
        }
    }

    public function addNew($data) {
        return $this->insertFueling($data);
    }

    private function updateFueling($d) {
        $fullTank = $d->fullTank ? 1 : 0;

        $query = $this->db->prepare('UPDATE fuel 
            SET `date` = ?,
            quantity = ?,
            pricePerLiter = ?,
            price = ?,
            odo = ?,
            odo2 = ?,
            fullTank = ?,
            note = ?
            WHERE id = ? AND userId = ?');
        $query->execute(array($d->date, $d->quantity, $d->pricePerLiter, $d->price, $d->odo, $d->odo2,
            $fullTank, $d->note, $d->id, $this->uid));

        $this->odo->updateOdo($d->odo, $d->odo2);
    }

    public function update($d) {
        $this->updateFueling($d);
    }

    private function findAllFuelings($id) {
        $q = "SELECT id, `date`, quantity, pricePerLiter, price, odo, odo2,
            fullTank, note, vehicleId 
            FROM fuel 
            WHERE vehicleId = ? AND userId = ?
            ORDER BY `date` DESC";

        $query = $this->db->prepare($q);

        $query->execute(array($id, $this->uid));
        $result = $query->fetchAll();
        return $result;
    }

    // TODO: pridat check na nove/upravu stavajiciho tankovani => vkladane ODO(km, mh) musi byt vetsi nez
    //      predchozi tankovani || predchozi tankovani == 0km|mh || predhozi tankovani neni
    //      a zaroven nasledujici tankovani nesmi existovat || nasl. tank. ma km|mh vetsi nez vkladane

    private function findFuelings($id) {

        $this->pageable['totalElements'] = $this->_getNumberOfElements($id);
        $this->pageable['size'] = isset($_REQUEST['size']) ? $_REQUEST['size'] : 20;
        $this->pageable['number'] = isset($_REQUEST['page']) ? $_REQUEST['page'] : 0;

        $this->pageable['totalPages'] = ceil($this->pageable['totalElements'] / $this->pageable['size']);
        $this->pageable['first'] = $this->pageable['number'] == 0 ? true : false;
        $this->pageable['last'] = $this->pageable['number'] == ($this->pageable['totalPages'] -1) ? true : false;

        $fromItem = $this->pageable['number'] * $this->pageable['size'];
        if (!$fromItem) {$fromItem = "0";}
        $size = $this->pageable['size'] + 1;
        $limit = $size > 0 ? "LIMIT " . $fromItem . ", " . ($this->pageable['size'] + 1) : '';

        $q = "SELECT id, `date`, quantity, pricePerLiter, price, odo, odo2,
            fullTank, note, vehicleId 
            FROM fuel 
            WHERE vehicleId = ? AND userId = ?
            ORDER BY odo DESC " . $limit ;

        $query = $this->db->prepare($q);

        $query->execute(array($id, $this->uid));
        $result = $query->fetchAll();

        $this->pageable['numberOfElements'] = count($result);

        return $result;
    }

    private function _getNumberOfElements($id) {
        $query = $this->db->prepare('SELECT COUNT(id) AS count FROM fuel WHERE vehicleId = ? AND userId = ?');
        $query->execute(array($id, $this->uid));
        $r = $query->fetch();
        return $r['count'];
    }

    private function findFueling($id) {
        $query = $this->db->prepare('SELECT id, `date`, quantity, pricePerLiter, price, odo, odo2,
            fullTank, note, vehicleId FROM fuel WHERE id = ? AND userId = ?');
        $query->execute(array($id, $this->uid));
        return $query->fetch();
    }

    public function getFueling($id) {
        $result = $this->findFueling($id);
        $result['fullTank'] = $result['fullTank'] == 0 ? false : true;
        $result['odo'] = floatval($result['odo']);
        $result['odo2'] = floatval($result['odo2']);
        return $result;
    }

    public function getListOfFuelings($id) {
        $data = $this->findFuelings($id);
        $result = $this->getFuelings($data, true);
        return new FuelDto($this->pageable, $result);
    }

    public function prepareStats($id) {
        $raw = $this->findAllFuelings($id);
        $data = $this->getFuelings($raw);

        if (count($raw) > 0) {

            $count = 0;
            $totalPrice = 0;
            $totalAmount = 0;
            $avgAmount = 0;
            $avgConsumptionMileage = 0;
            $avgConsumptionHours = 0;
            $avgPrice = 0;
            $pricesPerLiter = 0;
            $avgPricePerLiter = 0;

            $totalMileage = count($data) > 0 ? $data[0]['odo'] - $data[count($data) - 1]['odo'] : 0;
            $totalHours = count($data) ? $data[0]['odo2'] - $data[count($data) - 1]['odo2'] : 0;

            $payedTanks = 0;
            $consumptionMileage = 0;
            $consumptionHours = 0;
            $consCount = 0;
            $consHoursCount = 0;

            foreach($data as $v) {
                $count += 1;
                $totalPrice += $v['price'];
                $totalAmount += $v['quantity'];

                $payedTanks += $v['price'] > 0 ? 1 : 0;
                $pricesPerLiter += $v['pricePerLiter'];
                $consumptionMileage += $v['consumption'];
                $consumptionHours += $v['consumptionHours'];
                $consCount += $v['consumption'] > 0 ? 1 : 0;
                $consHoursCount += $v['consumptionHours'] > 0 ? 1 : 0;

            }

            $avgAmount = $count > 0 ? round($totalAmount / $count, 2) : 0;
            $avgConsumptionMileage = $consCount > 0 ? round($consumptionMileage / $consCount, 2) : 0;
            $avgConsumptionHours = $consHoursCount > 0 ? round($consumptionHours / $consHoursCount, 2) : 0;
            $avgPrice = $payedTanks > 0 ? round($totalPrice / $payedTanks, 2) : 0;
            $avgPricePerLiter = $payedTanks > 0 ? round($pricesPerLiter / $payedTanks, 2) : 0;

            return array(
                array(
                    'value' => $count,
                    'label' => 'Celkový počet tankování',
                    'unit' => ''
                ),
                array(
                    'value' => $totalPrice,
                    'label' => 'Celkové náklady',
                    'unit' => 'Kč'
                ),
                array(
                    'value' => $totalAmount,
                    'label' => 'Celkově natankované množství',
                    'unit' => 'l'
                ),
                array(
                    'value' => $avgAmount,
                    'label' => 'Průměrné natankované množství',
                    'unit' => 'l'
                ),
                array(
                    'value' => $avgConsumptionMileage,
                    'label' => 'Průměrná spotřeba',
                    'unit' => 'l/100 km'
                ),
                array(
                    'value' => $avgConsumptionHours,
                    'label' => 'Průměrná spotřeba',
                    'unit' => 'l/1 mh'
                ),
                array(
                    'value' => $avgPrice,
                    'label' => 'Průměrná cena za tankování',
                    'unit' => 'Kč'
                ),
                array(
                    'value' => $avgPricePerLiter,
                    'label' => 'Průměrná cena za litr',
                    'unit' => 'Kč/l'
                ),
                array(
                    'value' => $totalMileage,
                    'label' => 'Celkový nájezd',
                    'unit' => 'km'
                ),
                array(
                    'value' => $totalHours,
                    'label' => 'Celkový nájezd',
                    'unit' => 'mh'
                ),
            );
        } else {
            return null;
        }
    }

    public function getFuelings($fuelings_raw, $removeLast = false) {

        // $fuelings_raw = $this->findFuelings($id);
        $fuelings = array_reverse($fuelings_raw);

        $all = array();
        $data = array();

        $last = null;
        $stockDistance = 0;
        $stockHours = 0;
        $stockLiters = 0;

        foreach($fuelings as $v) {

            $consumption = 0;
            $consumptionHours = 0;
            $distance = 0;
            $hoursDistance = 0;

            if ($last) {
                $distance = $this->getDistance($last['odo'],$v['odo']);
                $hoursDistance = round($this->getDistance($last['odo2'],$v['odo2']),1);
                if (!$stockDistance) {
                    $consumption = $this->getConsumption($distance,$v['quantity']);
                    $consumptionHours = $this->getMHConsumption($hoursDistance,$v['quantity']);
                }
            }

            if ($v['fullTank'] == false) {
                $consumption = 0;
                $consumptionHours = 0;
                $stockLiters += $v['quantity'];
                $stockDistance += $distance;
                $stockHours += $hoursDistance;
            } else {
                if ($stockDistance || $stockHours) {
                    $stockLiters += $v['quantity'];
                    $stockDistance += $distance;
                    $stockHours += $hoursDistance;

                    $consumption = $this->getConsumption($stockDistance,$stockLiters);
                    $consumptionHours = $this->getMhConsumption($stockHours,$stockLiters);

                    $stockDistance = 0;
                    $stockHours = 0;
                    $stockLiters = 0;
                }
            }

            $fuel = array(
                'id' => $v['id'],
                'vehicleId' => $v['vehicleId'],
                'date' => $v['date'],
                'quantity' => floatval($v['quantity']),
                'pricePerLiter' => floatval($v['pricePerLiter']),
                'price' => floatval($v['price']),
                'odo' => intval($v['odo']),
                'odo2' => floatval($v['odo2']),
                'note' => $v['note'],
                'fullTank' => $v['fullTank'] == 0 ? false : true,
                'consumption' => floatval($consumption),
                'consumptionHours' => floatval($consumptionHours),
                'distance' => floatval($distance),
                'hoursDistance' => floatval($hoursDistance),
            );
            array_push($all, $fuel);

            $last = $v;
        }
        $result = array_reverse($all);
        if (count($result) > $this->pageable['size'] && $removeLast == true) {
            array_pop($result);
        }
        return $result;
    }

    public function delete($d) {
        $query = $this->db->prepare('DELETE FROM fuel WHERE id = ? AND userId = ?');
        $res = $query->execute(array($d->id, $this->uid));
        $this->odo->onOdoRemove($d->odo, $d->odo2);
        return $res;
    }

    private function getDistance($last, $current) {
        if (!$last && !$current) return 0;

        if ($last > $current) return 0;

        return $current - $last;
    }

    private function getConsumption($distance,$liters) {
        if (!$distance || !$liters) return '-'; 

        return round(((100 / $distance) * $liters),1);
    }

    private function getMhConsumption($hours,$liters) {
        if (!$hours || !$liters) return '-'; 

        return round(((1 / $hours) * $liters),2);
    }

    private function findLastMileage($id) {
        $q = $this->db->prepare('SELECT MAX(odo) AS odo, MAX(odo2) AS odo2 FROM fuel WHERE vehicleId = ?  AND userId =?');
        $q->execute(array($id, $this->uid));
        return $q->fetch();
    }

    private function findAllMileages($id) {
        $q = $this->db->prepare('SELECT odo, odo2,`date` FROM fuel WHERE vehicleId = ?  AND userId =? ORDER BY odo ASC');
        $q->execute(array($id, $this->uid));
        return $q->fetchAll();
    }

    public function getLastMileage($id) {
        $result = $this->findLastMileage($id);
        $orig = $this->getOriginalMileage($id);

        return array(
            'odo' => floatval($result['odo']),
            'odo2' => floatval($result['odo2']),
            'originalOdo' => floatval($orig['odo']),
            'originalOdo2' => floatval($orig['odo2'])
        );
    }

    private function getOriginalMileage($id) {
        $q = $this->db->prepare('SELECT odo, odo2 FROM seller WHERE vehicleId = ? AND userId = ?');
        $q->execute(array($id, $this->uid));
        return $q->fetch();
    }

    public function getAllMileages($id) {
        $mileages = $this->findAllMileages($id);
        $originalOdos = $this->getOriginalMileage($id);

        $startYear = 0;
        $startOdo = 0;
        $startOdo2 = 0;

        $endOdo = 0;
        $endOdo2 = 0;

        $data = [];
        $lastYear = null;

        foreach ($mileages as $m) {
            $year = date('Y', strtotime($m['date']));
            $odo = floatval($m['odo']);
            $odo2 = floatval($m['odo2']);

            if ($year == $lastYear) {
                $endOdo = $odo;
                $endOdo2 = $odo2;
            } else {

                if ($lastYear != null) {
                    
                    $data[] = array(
                        'year' => $lastYear,
                        'odo' => $odo - $startOdo,
                        'odo2' => $odo2 - $startOdo2
                    );
                }

                $lastYear = $year;
                $startOdo = $odo;
                $startOdo2 = $odo2;
            }
        }

        $data[] = array(
            'year' => $lastYear,
            'odo' => $startOdo > $endOdo ? $startOdo - $endOdo : $endOdo - $startOdo,
            'odo2' => $startOdo2 > $endOdo2 ? $startOdo2 - $endOdo2 : $endOdo2 - $startOdo2
        );

        $data[0]['odo'] = $originalOdos['odo'] > 0
                            ? $data[0]['odo'] + ($mileages[0]['odo'] - $originalOdos['odo'])
                            : $data[0]['odo'];

        $data[0]['odo2'] = $originalOdos['odo2'] > 0
                            ? $data[0]['odo2'] + ($mileages[0]['odo2'] - $originalOdos['odo2'])
                            : $data[0]['odo2'];

        return array_reverse($data);
    }

    private function _getFuelStats($vehicleId) {
        $query = $this->db->prepare('SELECT SUM(quantity) as quantity, SUM(price) as price, MONTH(date) as month, YEAR(date) as year
            FROM `fuel`
            WHERE vehicleId = ?
            GROUP BY month, year
            ORDER BY year DESC, month DESC');
        $query->execute(array($vehicleId));
        return $query->fetchAll();
    }

    public function getFuelStats($vehicleId, $limit) {        
        $data = $this->_getFuelStats($vehicleId);

        $data = array_slice($data, 0, $limit);
        $data = array_reverse($data);

        $series = [];
        foreach($data as $d) {
            $series[] = array(
                'name' => $d['year'].'/'. ($d['month'] > 9 ? $d['month'] : '0'.$d['month']),
                'series' => [array(
                    'name' => 'litry',
                    'value' => round(intval($d['quantity']), 2)
                )]
            );
        }
        return $series;
    }

    public function getMileageStats($id) {
        $units = $this->getUnits($id);

        $data = $this->findAllMileages($id);
        array_reverse($data);

        $series1 = [];
        $series2 = [];
        foreach($data as $d) {
            $series1[] = array(
                'name' => date_format(new DateTime($d['date']), 'd.m.Y'),
                'value' => $d['odo']
            );
            if ($units['subUnits']) {
                $series2[] = array(
                    'name' => date_format(new DateTime($d['date']), 'd.m.Y'),
                    'value' => $d['odo2']
                );
            }
        }

        $odo = array(
            'name' => $units['units'],
            'series' => $series1
        );

        if ($units['subUnits']) {
            $odo2 = array(
                'name' => $units['subUnits'],
                'series' => $series2
            );
        }

        return $units['subUnits'] ? [$odo, $odo2] : [$odo];
    }

    private function getUnits($id) {
        $q = $this->db->prepare('SELECT units, subUnits FROM vehicles WHERE id = ?');
        $q->execute(array($id));
        return $q->fetch();
    }

}