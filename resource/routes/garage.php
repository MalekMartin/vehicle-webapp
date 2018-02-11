<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/resource/garages', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Garages list");
    $mapper = new Garage($this->db, $this->jwt->uid);
    $garage = $mapper->getGarages();
    return $response->withJson($garage);
});

$app->post('/resource/garages/update', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Garage update");
    $mapper = new Garage($this->db, $this->jwt->uid);
    $d = json_decode(file_get_contents('php://input'));
    $mapper->updateGarage($d);
    return $response->withJson($d);
});

$app->post('/resource/garages/add', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Garage update");
    $mapper = new Garage($this->db, $this->jwt->uid);
    $d = json_decode(file_get_contents('php://input'));
    $mapper->addGarage($d);
    return $response->withJson($d);
});

$app->delete('/resource/garages/{id}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Garage delete");
    $mapper = new Garage($this->db, $this->jwt->uid);
    $mapper->delete($args['id']);
    return $response->withJson($args['id']);
});

$app->get('/resource/garages/{id}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Garage get");
    $mapper = new Garage($this->db, $this->jwt->uid);
    $garage = $mapper->getGarage($args['id']);
    return $response->withJson($garage);
});

$app->get('/resource/garages/{id}/repairs', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Garage repairs");
    $mapper = new Garage($this->db, $this->jwt->uid);
    $repairs = $mapper->getGarageRepairs($args['id']);
    return $response->withJson($repairs);
});