<?php
class Test {

    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getTestData() {
        $data = $this->find();
        $res = $data->fetchAll();
        return $res;
    }

    private function find() {
        $parametry = array();
        $dotaz = $this->db->prepare('SELECT * FROM vehicles');
        $dotaz->execute(array());
        return $dotaz;
    }

}