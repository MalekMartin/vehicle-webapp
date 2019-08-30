<?php
class Manuals {

    private $db;
    private $uid;
    
    public function __construct($db, $uid) {
        $this->db = $db;
        $this->uid = $uid;
    }

    public function handleFile() {
        $vehicleId = $_REQUEST['vehicleId'];
        $target_dir = "../../manuals/";
        if (!file_exists($target_dir)){
            mkdir($target_dir, 0777, true);
        }

        $target_dir .= $vehicleId . "/";
        if (!file_exists($target_dir)) {
            mkdir($target_dir, 0777, true);
        }
        $fileName = basename($_FILES['file']['name']);
        try {
            if (move_uploaded_file($_FILES['file']['tmp_name'], $target_dir.$fileName)) {
                $this->addFileToDb(
                    basename($_FILES['file']['name']),
                    $vehicleId,
                    $_FILES['file']['type'],
                    $_FILES['file']['size']
                );
                return array('file' => $fileName);
            } else {
                return null;
            }
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
    
    private function addFileToDb($fileName, $vehicleId, $type, $size) {
        $query = $this->db->prepare('INSERT INTO manual (vehicleId, name, type, size, userId) VALUES (?,?,?,?,?)');
        return $query->execute(array($vehicleId, $fileName, $type, $size, $this->uid));
    }

    private function findManuals($id) {
        $query = $this->db->prepare('SELECT id, name, type, size FROM manual WHERE vehicleId = ? AND userId = ?');
        $query->execute(array($id, $this->uid));
        return $query->fetchAll();
    }

    public function getManuals($id) {

        $data = $this->findManuals($id);

        $all = array();

        foreach($data as $v) {
            $prop = array(
                'id' => $v['id'],
                'name' => $v['name'],
                'type' => $v['type'],
                'size' => $v['size'],
            );

            array_push($all, $prop);
        }
        return $all;
    }

    public function deleteImage($id) {
        $f = $this->findImageByVehicleId($id);

        unlink('../../uploads/'.$f['vehicleId']."/80x80_".$f['fileName']);
        unlink('../../uploads/'.$f['vehicleId']."/40x40_".$f['fileName']);
        unlink('../../uploads/'.$f['vehicleId']."/".$f['fileName']);

        // Db::query('DELETE FROM files WHERE id = ?', array($_REQUEST['id']));
        $query = $this->db->prepare('DELETE FROM files WHERE vehicleId = ?');
        $query->execute(array($id));
        // http_response_code(200);
        $res = array('status' => 'deleted');
        // echo json_encode($res);
        return $res;
    }

    private function findImageById($id) {
        // $res = Db::query('SELECT vehicleId, fileName, type FROM files WHERE id = ?', array($id));
        // $d = $res->fetch();
        // return $d;
        $query = $this->db->prepare('SELECT id, fileName, type FROM files WHERE vehicleId = ? AND userId = ?');
        $query->execute(array($id, $this->uid));
        $res = $query->fetch();
        return $res;
    }

    private function findImageByVehicleId($id) {
        // $r = Db::query('SELECT id, fileName, type FROM files WHERE vehicleId = ?',array($id));
        // return $r->fetch();
        $query = $this->db->prepare('SELECT id, vehicleId, fileName, type FROM files WHERE vehicleId = ? AND userId = ?');
        $query->execute(array($id, $this->uid));
        $res = $query->fetch();
        return $res;
    }

    public function getImageByVehicleId($id) {
        // $id = $_REQUEST['vehicleId'];
        if ($id) {
            $img = $this->findImageByVehicleId($id);
            $src = "";

            if ($img) {
                $image = '../../uploads/'.$id.'/'.$img['fileName'];
                $imageData = base64_encode(file_get_contents($image));

                // Format the image SRC:  data:{mime};base64,{data};
                $src = 'data:'.$img['type'].';base64,'.$imageData;                
            }

            if ($src) {
                return array(
                    'uri' => $src
                );
            } else {
                return null;
            }
            
        }
    }
}