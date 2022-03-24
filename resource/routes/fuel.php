<?php

// use \Psr\Http\Message\ServerRequestInterface as Request;
// use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Slim\Http\Response as Response;

$app->get('/resource/fueling/{id}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Fueling list for vehicle id - " . $args['id']);
    $mapper = new Fuel($this->db, $args['id'], $this->jwt->uid);
    $fueling = $mapper->getFueling($args['id']);
    return $response->withJson($fueling);
});

$app->post('/resource/fuelings/new', function (Request $request, Response $response) {
    $this->logger->addInfo("Fueling add");
    $d = json_decode(file_get_contents('php://input'));
    $mapper = new Fuel($this->db, $d->vehicleId, $this->jwt->uid);
    $result = $mapper->addNew($d);
    if ($result) {
        return $response->withStatus(201)->write('[]');
    } else {
        return $response->withStatus(500)->write([]);
    }
});

$app->get('/resource/fuelings/{id}/stats', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Fueling stats for vehicle id - " . $args['id']);
    $mapper = new Fuel($this->db, $args['id'], $this->jwt->uid);
    $fueling = $mapper->prepareStats($args['id']);
    return $response->withJson($fueling);
});

$app->get('/resource/fuelings/{id}/last-mileage', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Get last mileage for vehicle id - " . $args['id']);
    $mapper = new Fuel($this->db, $args['id'], $this->jwt->uid);
    $fuelings = $mapper->getLastMileage($args['id']);
    return $response->withJson($fuelings);
});

$app->get('/resource/fuelings/{id}/annual-mileages', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Get all mileages for vehicle id - " . $args['id']);
    $mapper = new Fuel($this->db, $args['id'], $this->jwt->uid);
    $fuelings = $mapper->getAllMileages($args['id']);
    return $response->withJson($fuelings);
});

$app->get('/resource/fuelings/{id}/mileage-stats', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Get mileage stats for vehicle id - " . $args['id']);
    $mapper = new Fuel($this->db, $args['id'], $this->jwt->uid);
    $fuelings = $mapper->getMileageStats($args['id']);
    return $response->withJson($fuelings);
});

$app->get('/resource/fuelings/{id}/fuel-stats', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Get fuel stats for vehicle id - " . $args['id']);
    $mapper = new Fuel($this->db, $args['id'], $this->jwt->uid);
    $limit = isset($_GET['limit']) && $_GET['limit'] >= 0 ? $_GET['limit'] : 12;
    $fuelings = $mapper->getFuelStats($args['id'], $limit);
    return $response->withJson($fuelings);
});

$app->post('/resource/fuelings/delete', function (Request $request, Response $response) {
    $this->logger->addInfo("Fueling delete");
    $d = json_decode(file_get_contents('php://input'));
    $mapper = new Fuel($this->db, $d->vehicleId, $this->jwt->uid);
    $res = $mapper->delete($d);
    if ($res) {
        return $response->withStatus(200);
    } else {
        return $response->withStatus(500);
    }
});

$app->post('/resource/fuelings/{VehicleId}/{fuelingId}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Fueling update");
    $d = json_decode(file_get_contents('php://input'));
    $mapper = new Fuel($this->db, $d->vehicleId, $this->jwt->uid);
    $mapper->update($d);
    return $response->withJson($args['fuelingId']);
});

$app->get('/resource/{id}/fuelings', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Fueling list for vehicle id - " . $args['id']);
    $mapper = new Fuel($this->db, $args['id'], $this->jwt->uid);
    $fuelings = $mapper->getListOfFuelings($args['id']);
    return $response->withJson($fuelings);
});
