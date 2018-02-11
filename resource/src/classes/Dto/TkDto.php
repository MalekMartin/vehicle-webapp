<?php
class TkDto
{
    public $id;
    public $vehicleId;
    public $date;
    public $expirationDate;
    public $repeated;
    public $note;
    public $price;
    public $name;
    public $stationId;
    public $odo;
    public $odo2;

    public function __construct(array $t) {
        $this->id = $t['id'];
        $this->vehicleId = $t['vehicleId'];
        $this->date = $t['date'];
        $this->expirationDate = $t['expirationDate'];
        $this->repeated = $t['repeated'] == 0 ? false : true;
        $this->note = $t['note'];
        $this->price = floatval($t['price']);
        $this->name = $t['name'];
        $this->stationId = $t['stationId'];
        $this->odo = floatval($t['odo']);
        $this->odo2 = floatval($t['odo2']);
    }

}

