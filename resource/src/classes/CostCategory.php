<?php

require 'Dto/CostCategoryDto.php';

class CostCategory {

    public $db;
    private $uid;

    public function __construct($db, $uid) {
        $this->db = $db;
        $this->uid = $uid;
    }
    
    private function findCategories() {
        $query = $this->db->prepare('SELECT id, title, description, color
        FROM category
        WHERE userId = ?
        ORDER BY title');
        $query->execute(array($this->uid));
        return $query->fetchAll();
    }

    public function getCategories() {
        $result = [];
        foreach ($this->findCategories() as $row) {
            $result[] = $row;
        }
        return $result;
    }

    private function insertCategory($d) {
        $query = $this->db->prepare('INSERT INTO category (title, description, color, userId) VALUES (?,?,?,?)');
        $query->execute(array($d->title, $d->description, $d->color,$this->uid));
    }

    private function updateCategory($d) {
        $query = $this->db->prepare('UPDATE category SET title = ?, description = ?, color = ? WHERE id = ? AND userId = ?');
        $query->execute(array($d->title, $d->description, $d->color, $d->id,$this->uid));
    }

    public function saveCategory($d) {
        if ($d->id) {
            $this->updateCategory($d);
        } else {
            $this->insertCategory($d);
        }
    }

    public function delete($id) {
        $query = $this->db->prepare('DELETE FROM category WHERE id = ? AND userId = ?');
        try {
            $query->execute(array($id,$this->uid));
        } catch (PDOException  $e) {
//            if ($e->getCode() == '23000')
//                echo "Syntax Error: ".$e->getMessage();
            return $e;
        }
    }
}