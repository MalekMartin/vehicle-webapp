<?php
class CostPageDto {

    public $content;
    public $first;
    public $last;
    public $number;
    public $totalElements;
    public $totalPages;
    public $numberOfElements;
    public $size;
    public $sort;

    public function __construct($content,
                                $first,
                                $last,
                                $number,
                                $totalElements,
                                $totalPages,
                                $numberOfElements,
                                $size,
                                $sort) {
        $this->content = $content;
        $this->first = $first;
        $this->last = $last;
        $this->number = intval($number);
        $this->totalElements = intval($totalElements);
        $this->totalPages = $totalPages;
        $this->numberOfElements = $numberOfElements;
        $this->size = intval($size);
        $this->sort = $sort;
    }
}