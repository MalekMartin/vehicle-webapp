<?php

/**
 * Created by PhpStorm.
 * User: Martin
 * Date: 28. 5. 2017
 * Time: 21:20
 */
class CostCategoryDto
{
    private $id;
    private $title;
    private $description;
    private $color;

    /**
     * CostCategoryDto constructor.
     * @param $category array
     */
    public function __construct(array $category)
    {
        $this->id = $category['id'];
        $this->title = $category['title'];
        $this->description = $category['description'];
        $this->color = $category['color'];
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
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
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @return string
     */
    public function getColor()
    {
        return $this->color;
    }




}