<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/resource/tires/{vehicleId}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Tires list");
    $mapper = new Tire($this->db, $this->jwt->uid);
    $tires = $mapper->getAllTiresByVehicleId($args['vehicleId']);
    
    return $response->withJson($tires);
});

$app->post('/resource/tires/{vehicleId}/add', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Tire add");
    $mapper = new Tire($this->db, $this->jwt->uid);
    $d = json_decode(file_get_contents('php://input'));
    $tire = $mapper->add($d);
    return $response->withJson($tire);
});

$app->post('/resource/tires/{id}/status', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Tire status update");
    $mapper = new Tire($this->db, $this->jwt->uid);
    $d = json_decode(file_get_contents('php://input'));
    $resp = $mapper->updateStatus($d);
    return $response->withJson($resp);
});

$app->get('/resource/tires/{id}/history', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Tire history");
    $mapper = new Tire($this->db, $this->jwt->uid);
    $tires = $mapper->getHistory($args['id']);
    return $response->withJson($tires);
});

$app->post('/resource/tires/{id}/change', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Tire change");
    $mapper = new Tire($this->db, $this->jwt->uid);
    $d = json_decode(file_get_contents('php://input'));
    $mapper->changeTire($d);
    return $response->withJson($d);
});

$app->post('/resource/tires/{id}/update', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Tire update info");
    $mapper = new Tire($this->db, $this->jwt->uid);
    $d = json_decode(file_get_contents('php://input'));
    $mapper->update($d);
    return $response->withJson($d);
});

$app->delete('/resource/tires/{id}/delete', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Tire deletion");
    $mapper = new Tire($this->db, $this->jwt->uid);
    $tires = $mapper->delete($args['id']);
    return $response->withJson($args['id']);
});

$app->post('/resource/tires/{vehicleId}/update-property', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Tire property update");
    $mapper = new Tire($this->db, $this->jwt->uid);
    $d = json_decode(file_get_contents('php://input'));
    $mapper->editProperty($d);
    return $response->withJson($d);
});

$app->get('/resource/tires/{vehicleId}/properties', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Tire properties list");
    $mapper = new Tire($this->db, $this->jwt->uid);
    $tires = $mapper->getPropertiesById($args['vehicleId']);
    return $response->withJson($tires);
});

$app->delete('/resource/tires/{vehicleId}/delete-property/{id}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Tire property deletion");
    $mapper = new Tire($this->db, $this->jwt->uid);
    $tires = $mapper->deleteProperty($args['id']);
    return $response->withJson($args['id']);
});