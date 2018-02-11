<?php

class TireChangeDto
{
    public $brand;
    public $model;
    public $date;
    public $tire;
    public $odo;
    public $odo2;
    public $dimensions;
    public $type;
    public $status;

    public function __construct(array $tire) {
        $this->brand = $tire['brand'];
        $this->model = $tire['model'];
        $this->date = $tire['date'];
        $this->odo = $tire['odo'];
        $this->odo2 = $tire['odo2'];
        $this->tire = $tire['tire'];
        $this->dimensions = $tire['dimensions'];
        $this->type = 'TIRE_CHANGE';
        $this->status = $tire['status'];
    }
}