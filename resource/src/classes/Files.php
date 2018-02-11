<?php
class Files {

    private $db;
    private $uid;
    
    public function __construct($db, $uid) {
        $this->db = $db;
        $this->uid = $uid;
    }

    public function handleFile() {
        $vehicleId = $_REQUEST['vehicleId'];
        $target_dir = "../../uploads/";
//        $thumb_dir = "../../uploads/".$vehicleId."/thumb_";
        if (!file_exists($target_dir)){
            mkdir($target_dir, 0777, true);
        }

        $target_dir .= $vehicleId."/";
        if (!file_exists($target_dir)) {
            mkdir($target_dir, 0777, true);
        }
//        $target_file = $target_dir . basename($_FILES["file"]["name"]);

        list($width, $height) = getimagesize($_FILES["file"]["tmp_name"]);

        $newWidth = 0;
        $newHeight = 0;
        $posX = 0;
        $posY = 0;
        $h640 = $this->getNewHeight($width,$height,640);

        $source = imagecreatefromjpeg($_FILES["file"]["tmp_name"]);

        if ($width !== $height) {
            if ($width > $height) {
                $newHeight = $height;
                $newWidth = $height;
                $posX = ceil(($width - $height) / 2);
            } else {
                $newHeight = $width;
                $newWidth = $width;
                $posY = ceil(($height - $width) / 2);
            }
            $im = imagecrop($source, ['x' => $posX, 'y' => $posY, 'width' => $newWidth, 'height' => $newHeight]);
        }

        $im80 = imagecreatetruecolor(80, 80);
        $im40 = imagecreatetruecolor(40, 40);
        $im640 = imagecreatetruecolor(640, $h640);

        imagecopyresized($im80, $im, 0, 0, 0, 0, 80, 80, $newWidth, $newHeight);
        imagecopyresized($im40, $im, 0, 0, 0, 0, 40, 40, $newWidth, $newHeight);
        imagecopyresized($im640, $source, 0, 0, 0, 0, 640, $h640, $width, $height);

        imagejpeg($im80, $target_dir.'80x80_'.basename($_FILES['file']['name']),100);
        imagejpeg($im40, $target_dir.'40x40_'.basename($_FILES['file']['name']),100);
        imagejpeg($im640, $target_dir.basename($_FILES['file']['name']),100);

        $this->addFileToDb(basename($_FILES['file']['name']), $vehicleId, $_FILES['file']['type']);
        http_response_code(200);
    }
    
    private function addFileToDb($fileName, $vehicleId, $type) {
        // Db::query('INSERT INTO files (vehicleId, fileName, type) VALUES (?,?,?)', array($vehicleId, $fileName, $type));
        $query = $this->db->prepare('INSERT INTO files (vehicleId, fileName, type, userId) VALUES (?,?,?,?)');
        $query->execute(array($vehicleId, $fileName, $type, $this->uid));
    }

    private function findImages($id) {
        // $r = Db::query('SELECT id, fileName FROM files WHERE vehicleId = ?', array($d));
        $query = $this->db->prepare('SELECT id, fileName FROM files WHERE vehicleId = ? AND userId = ?');
        $query->execute(array($id, $this->uid));
        // return $r->fetchAll();
        $res = $query->fetchAll();
        return $res;
    }

    private function getNewHeight($width,$height,$newWidth) {
        $proc = ceil(($newWidth/$width) * 100);
        return ceil($height * ($proc/100));
    }

    public function getImages($id) {

        $data = $this->findImages($id);

        $all = array();

        foreach($data as $v) {
            $image = '../../uploads/'.$id.'/'.$v['fileName'];
            $imageData = base64_encode(file_get_contents($image));

            // Format the image SRC:  data:{mime};base64,{data};
            $src = 'data:image/jpeg;base64,'.$imageData;
            $prop = array(
                'id' => $v['id'],
                'fileName' => $v['fileName'],
                'uri' => $src
            );

            array_push($all, $prop);
        }
        return $all;
        // echo json_encode($all);
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