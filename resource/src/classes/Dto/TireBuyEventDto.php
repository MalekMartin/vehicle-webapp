<?php

class TireBuyEventDto
{
    public $brand;
    public $model;
    public $date;
    public $quantity;
    public $price;
    public $note;
    public $tire;
    public $dimensions;
    public $type;

    public function __construct(array $tire)
    {
        $this->brand = $tire['brand'];
        $this->model = $tire['model'];
        $this->date = $tire['date'];
        $this->quantity = $tire['quantity'];
        $this->price = $tire['price'];
        $this->note = $tire['note'];
        $this->tire = $tire['tire'];
        $this->dimensions = $tire['dimensions'];
        $this->type = 'NEW_TIRE';
    }

    /**
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @return mixed
     */
    public function getBrand()
    {
        return $this->brand;
    }

    /**
     * @return mixed
     */
    public function getModel()
    {
        return $this->model;
    }

    /**
     * @return mixed
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * @return mixed
     */
    public function getQuantity()
    {
        return $this->quantity;
    }

    /**
     * @return mixed
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * @return mixed
     */
    public function getNote()
    {
        return $this->note;
    }

    /**
     * @return string
     */
    public function getTire()
    {
        return $this->tire;
    }

    /**
     * @return mixed
     */
    public function getDimensions()
    {
        return $this->dimensions;
    }




}