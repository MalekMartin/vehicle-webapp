<?php

/**
 * Created by PhpStorm.
 * User: Martin
 * Date: 6. 8. 2017
 * Time: 12:18
 */
class FuelDto
{
    public $content;
    public $first;
    public $last;
    public $number;
    public $totalElements;
    public $totalPages;
    public $numberOfElements;
    public $size;
    public $sort;

    public function __construct($p, $content) {
        $this->content = $content;
        $this->first = $p['first'];
        $this->last = $p['last'];
        $this->number = intval($p['number']);
        $this->totalElements = intval($p['totalElements']);
        $this->totalPages = $p['totalPages'];
        $this->numberOfElements = $p['numberOfElements'];
        $this->size = intval($p['size']);
        $this->sort = $p['sort'];
    }

}