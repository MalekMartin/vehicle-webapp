<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/resource/vehicles', function (Request $request, Response $response, $args) {

    $this->logger->addInfo("Vehicles list");
    // $jwt = new JwtMapper($request->getHeader('Authorization'));
    
    $mapper = new Vehicles($this->db, $this->jwt->uid);
    $vehicles = $mapper->getAllVehicles();

    // $response->getBody()->write(var_export($tickets, true));
    // return $response;
    return $response->withJson($vehicles);
//    return $response->withJson($this->jw);
});

$app->get('/resource/vehicle/last-events', function (Request $request, Response $response,  $args) {
    $this->logger->addInfo("Vehicles events");
    $mapper = new Vehicles($this->db, $this->jwt->uid);
    $vehicles = $mapper->getLastEvents();
    return $response->withJson($vehicles);
});

$app->get('/resource/vehicle/{id}', function (Request $request, Response $response,  $args) {
    $this->logger->addInfo("Vehicle detail");
    $mapper = new Vehicles($this->db, $this->jwt->uid);
    $vehicles = $mapper->getVehicleById($args['id']);
    return $response->withJson($vehicles);
});

$app->post('/resource/vehicle/new', function (Request $request, Response $response) {

    $this->logger->addInfo("Vehicle add");
    $mapper = new Vehicles($this->db, $this->jwt->uid);
    $d = json_decode(file_get_contents('php://input'));
    $id = $mapper->addVehicle($d);
    return $response->withJson($id);
});

$app->delete('/resource/vehicle/{id}', function (Request $request, Response $response,  $args) {
    $this->logger->addInfo("Vehicle delete");
    $mapper = new Vehicles($this->db, $this->jwt->uid);
    $mapper->deleteVehicleById($args['id']);
    return $response->withJson($args['id']);
});

$app->post('/resource/vehicle/{id}/settings', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Vehicle add");
    $mapper = new Vehicles($this->db, $this->jwt->uid);
    $d = json_decode(file_get_contents('php://input'));
    $mapper->saveSettings($args['id'],$d);
    return $response->withJson($d);
});
