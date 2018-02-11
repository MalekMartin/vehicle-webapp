<?php

/**
 * Created by PhpStorm.
 * User: Martin
 * Date: 5. 8. 2017
 * Time: 7:54
 */
class CostEventDto
{
    public $brand;
    public $model;
    public $category;
    public $title;
    public $date;
    public $price;
    public $odo;
    public $odo2;
    public $type;

    /**
     * CostEventDto constructor.
     * @param $brand
     */
    public function __construct(array $c)
    {
        $this->brand = $c['brand'];
        $this->model = $c['model'];
        $this->category = $c['category'];
        $this->title = $c['title'];
        $this->date = $c['date'];
        $this->price = floatval($c['price']);
        $this->type = "COST";
        $this->odo = floatval($c['odo']);
        $this->odo2 = floatval($c['odo2']);
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
    public function getModel()
    {
        return $this->model;
    }

    /**
     * @return string
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @return string
     */
    public function getDate()
    {
        return $this->date;
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
    public function getType()
    {
        return $this->Type;
    }


}