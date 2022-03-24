<?php
class Tire {

    public $db;
    private $uid;

    public function __construct($db, $uid) {
        $this->db = $db;
        $this->uid = $uid;
    }

    public function add($d) {
        $query = $this->db->prepare('INSERT INTO tires (vehicleId,dot,purchaseDate,priceEach,quantity,totalPrice,description,
            status,brand,model,dimensions,notes,userId)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
        ');
        $query->execute(array($d->vehicleId,$d->dot,$d->purchaseDate,$d->priceEach,$d->quantity,$d->totalPrice,
            $d->description,$d->status,$d->brand,$d->model,$d->dimensions,$d->notes, $this->uid));
        $lastId = $this->db->lastInsertId();
        $d->id = $lastId;
        return $d;
    }


    private function findByStatus($id, $status) {
        $query = $this->db->prepare('SELECT id, vehicleId, dot, purchaseDate, quantity, priceEach, totalPrice, odo,
            odo2, notes, description, brand, model, dimensions, status, tireOdo, tireOdo2
            FROM tires WHERE vehicleId = ? AND status = ? AND userId = ?');
        $query->execute(array($id,$status,$this->uid));
        return $query->fetchAll();
    }

    private function findTiresByVehicleId($id) {
        $query = $this->db->prepare('SELECT id, vehicleId, dot, purchaseDate, quantity, priceEach, totalPrice, odo,
            odo2, notes, description, brand, model, dimensions, status, tireOdo, tireOdo2
            FROM tires WHERE vehicleId = ? AND userId = ?');
        $query->execute(array($id, $this->uid));
        return $query->fetchAll();
    }

    private function getByStatus($id,$status) {
        $tires = $this->findByStatus($id,$status);

        $all = array();

        foreach($tires as $v) {
            $tire = array(
                'id' => $v['id'],
                'vehicleId' => $v['vehicleId'],
                'dot' => $v['dot'],
                'purchaseDate' => $v['purchaseDate'],
                'quantity' => $v['quantity'],
                'priceEach' => $v['priceEach'],
                'totalPrice' => $v['totalPrice'],
                'odo' => $v['odo'],
                'odo2' => $v['odo2'],
                'notes' => $v['notes'],
                'description' => $v['description'],
                'brand' => $v['brand'],
                'model' => $v['model'],
                'dimensions' => $v['dimensions'],
                'status' => $v['status'],
                'tireOdo' => $v['tireOdo'],
                'tireOdo2' => $v['tireOdo2']
            );
            array_push($all, $tire);
        }
        return $all;
    }

    private function getTiresByVehicleId($id) {
        $tires = $this->findTiresByVehicleId($id);

        $all = array();

        foreach($tires as $v) {
            $tire = array(
                'id' => $v['id'],
                'vehicleId' => $v['vehicleId'],
                'dot' => $v['dot'],
                'purchaseDate' => $v['purchaseDate'],
                'quantity' => $v['quantity'],
                'priceEach' => $v['priceEach'],
                'totalPrice' => $v['totalPrice'],
                'odo' => $v['odo'],
                'odo2' => $v['odo2'],
                'notes' => $v['notes'],
                'description' => $v['description'],
                'brand' => $v['brand'],
                'model' => $v['model'],
                'dimensions' => $v['dimensions'],
                'status' => $v['status'],
                'tireOdo' => $v['tireOdo'],
                'tireOdo2' => $v['tireOdo2']
            );
            array_push($all, $tire);
        }
        return $all;
    }

    public function getAllTiresByVehicleId($id) {
        return $this->getTiresByVehicleId($id);
    }

    public function getByAllStatuses($id) {
        $active = $this->getByStatus($id,'ACTIVE');
        $stock = $this->getByStatus($id,'STOCK');
        $trash = $this->getByStatus($id,'TRASH');
        $property = $this->getProperties($id);

        $tires = array(
            "active" => $active,
            "stock" => $stock,
            "trash" => $trash,
            "properties" => $property
        );

        // $tires = 'tire';
        // $i = new $tires;
        // $i->active = $active;
        // $i->stock = $stock;
        // $i->trash = $trash;
        // $i->properties = $property;

        // echo json_encode($i);
        return $tires;
   }

   public function updateStatus($d) {
       $query = $this->db->prepare('UPDATE tires SET status = ? WHERE id = ?');
       $query->execute(array($d->status, $d->tire->id));
   }

   public function update($d) {

       $query = $this->db->prepare('UPDATE tires SET 
        dot = ?,
        purchaseDate = ?,
        description = ?,
        status = ?,
        brand = ?,
        model = ?,
        dimensions = ?,
        notes = ?,
        priceEach = ?,
        quantity = ?,
        totalPrice = ?,
        odo = ?,
        odo2 = ?,
        tireOdo = ?,
        tireOdo2 = ?
        WHERE id = ?');
        
        $query->execute(array(
            $d->dot,
            $d->purchaseDate,
            $d->description,
            $d->status,
            $d->brand,
            $d->model,
            $d->dimensions,
            $d->notes,
            $d->priceEach,
            $d->quantity,
            $d->totalPrice,
            $d->odo,
            $d->odo2,
            $d->tireOdo,
            $d->tireOdo2,
            $d->id)
        );
   }

    public function changeTire($d) {
       $query = $this->db->prepare('UPDATE tires SET 
        status = ?,
        odo = ?,
        odo2 = ?,
        tireOdo = ?,
        tireOdo2 = ?
        WHERE id = ?');

        $query->execute(array(
            $d->tire->status,
            $d->tire->odo,
            $d->tire->odo2,
            $d->tire->tireOdo,
            $d->tire->tireOdo2,
            $d->tire->id)
        );
        $this->addTireStatusHistory($d);
    }

   private function addTireStatusHistory($d) {
    //    $date = date("Y-m-d\TH:i:s\Z");
       $query = $this->db->prepare('INSERT INTO tire_change (tireId, `date`, odo, odo2,status)
       VALUES (?,?,?,?,?)');
       $query->execute(array($d->tire->id, $d->date, $d->tire->odo, $d->tire->odo2, $d->tire->status));
   }

   public function delete($id) {
       $query = $this->db->prepare('DELETE FROM tires WHERE id = ? AND userId = ?');
       $query->execute(array($id,$this->uid));
   }

   private function findProperties($id) {
       $query = $this->db->prepare('SELECT id, vehicleId, name, value, tooltip FROM tire_properties WHERE vehicleId = ?');
       $query->execute(array($id));
       return $query->fetchAll();
   }

   public function getProperties($id) {
       $query = $this->db->prepare('SELECT id, vehicleId, name, value, tooltip FROM tire_properties WHERE vehicleId = ?');
       $query->execute(array($id));
       return $query->fetchAll();
   }

   private function addProperty($d) {
       $query = $this->db->prepare('INSERT INTO tire_properties (vehicleId, name, value, tooltip)
       VALUES (?, ?, ?, ?)');
       $query->execute(array($d->vehicleId, $d->name, $d->value, $d->tooltip));
       $lastId = $this->db->lastInsertId();
       $d->id = $lastId;
       return $d;
   }

   private function updateProperty($d) {
       $query = $this->db->prepare('UPDATE tire_properties SET
       name = ?, value = ?, tooltip = ? WHERE id = ?');
       $query->execute(array($d->name, $d->value, $d->tooltip, $d->id));
       return $d;
   }

   public function editProperty($d) {
       if ($d->id) {
           $this->updateProperty($d);
       } else {
           return $this->addProperty($d);
       }
   }

   public function deleteProperty($id) {
       $query = $this->db->prepare('DELETE FROM tire_properties WHERE id = ?');
       $query->execute(array($id));
   }

   public function getPropertiesById($id) {
       $data = $this->getProperties($id);
       return $data;
   }

   private function findHistory($id) {
       $query = $this->db->prepare('SELECT `date`, odo, odo2, status 
       FROM tire_change WHERE tireId = ? ORDER BY `date` DESC');
       $query->execute(array($id));
       return $query->fetchAll();
   }

   public function getHistory($id) {
       $data = $this->findHistory($id);

       $all = array();

        foreach($data as $v) {
            $prop = array(
                'date' => $v['date'],
                'odo' => floatval($v['odo']),
                'odo2' => floatval($v['odo2']),
                'status' => $v['status']
            );
            array_push($all, $prop);
        }
        // echo json_encode($all);
        return $all;
   }


}