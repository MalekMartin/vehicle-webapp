<?php

/**
 * Created by PhpStorm.
 * User: Martin
 * Date: 5. 8. 2017
 * Time: 7:41
 */
class FuelEventDto
{
    public $brand;
    public $model;
    public $date;
    public $quantity;
    public $price;
    public $fullTank;
    public $odo;
    public $odo2;
    public $type;

    /**
     * FuelEventDto constructor.
     * @param $fuel array
     */
    public function __construct(array $fuel)
    {
        $this->brand = $fuel['brand'];
        $this->model = $fuel['model'];
        $this->date = $fuel['date'];
        $this->quantity = intval($fuel['quantity']);
        $this->price = floatval($fuel['price']);
        $this->fullTank = $fuel['fullTank'] ? true : false;
        $this->type = "FUEL";
        $this->odo = floatval($fuel['odo']);
        $this->odo2 = floatval($fuel['odo2']);
    }

    /**
     * @return string
     */
    public function getBrand()
    {
        return $this->brand;
    }

    /**
     * @return string
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * @return bool
     */
    public function isFullTank()
    {
        return $this->fullTank;
    }

    /**
     * @return string
     */
    public function getModel()
    {
        return $this->model;
    }

    /**
     * @return number
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * @return number
     */
    public function getQuantity()
    {
        return $this->quantity;
    }

    /**
     * @return string
     */
    public function getType()
    {
        return $this->Type;
    }

}