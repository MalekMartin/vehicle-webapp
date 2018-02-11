<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

// $app->get('/vehicles', function (Request $request, Response $response) {
//     $this->logger->addInfo("Vehicles list");
//     $mapper = new Files($this->db);
//     $vehicles = $mapper->getAllVehicles();

//     // $response->getBody()->write(var_export($tickets, true));
//     // return $response;
//     return $response->withJson($vehicles);
// });

// $app->get('/vehicle/{id}', function (Request $request, Response $response,  $args) {
//     $this->logger->addInfo("Vehicle detail");
//     $mapper = new Vehicles($this->db);
//     $vehicles = $mapper->getVehicleById($args['id']);

//     // $response->getBody()->write(var_export($tickets, true));
//     // return $response;
//     return $response->withJson($vehicles);
// });
$app->get('/resource/files/{id}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Files list");
    $mapper = new Files($this->db, $this->jwt->uid);
    $files = $mapper->getImages($args['id']);

    return $response->withJson($files);
});

$app->get('/resource/file/{id}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("File");
    $mapper = new Files($this->db, $this->jwt->uid);
    $file = $mapper->getImageByVehicleId($args['id']);
    
    if ($file) {
        return $response->withJson($file);
    } else {
        return $response->withStatus(404)->withJson(array('message' => 'Soubor nenalezen'));
    }
});

$app->delete('/resource/file/{id}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("File delete");
    $mapper = new Files($this->db, $this->jwt->uid);
    $file = $mapper->deleteImage($args['id']);

    return $response->withJson($file);
});

$app->post('/resource/file/new', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("File add");
    $mapper = new Files($this->db, $this->jwt->uid);
    $file = $mapper->handleFile($args);

    return $response->withJson($file);
});

// $files = new Files();
// switch ($_SERVER['REQUEST_METHOD']) {
//     case "GET":
//         if (isset($_REQUEST['all'])) {
//             $files->getImages();
//         }
//         if (isset($_REQUEST['delete'])) {
//             $files->deleteImage();
//         }
//         if (isset($_REQUEST['vehicleId'])) {
//             $files->getImageByVehicleId();
//         }
//         break;
//     case "POST":
//         $files->handleFile($_FILES);
//         break;