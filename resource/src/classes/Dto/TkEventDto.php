<?php

class TkEventDto {
    public $brand;
    public $model;
    public $date;
    public $station;
    public $odo;
    public $odo2;
    public $type;
    public $note;
    public $stationId;

    public function __construct(array $ti) {
        $this->brand = $ti['brand'];
        $this->model = $ti['model'];
        $this->date = $ti['date'];
        $this->price = $ti['price'];
        $this->note = $ti['note'];
        $this->station = $ti['station'];
        $this->type = 'TK';
        $this->odo = $ti['odo'];
        $this->odo2 = $ti['odo2'];
        $this->stationId = $ti['stationId'];
    }


}