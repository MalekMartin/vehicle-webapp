<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/resource/inspections/{vehicleId}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Technical inspections list");
    $mapper = new TechnicalInspection($this->db, $this->jwt->uid);
    $inspection = $mapper->getInspections($args['vehicleId']);
    return $response->withJson($inspection);
});

$app->get('/resource/inspection/{id}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Technical inspection detail");
    $mapper = new TechnicalInspection($this->db, $this->jwt->uid);
    $inspection = $mapper->getInspection($args['id']);
    return $response->withJson($inspection);
});

$app->post('/resource/inspections/{vehicleId}/update', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Technical inspection update");
    $mapper = new TechnicalInspection($this->db, $this->jwt->uid);
    $d = json_decode(file_get_contents('php://input'));
    $data = $mapper->update($d);
    return $response->withJson($data);
});

$app->delete('/resource/inspections/{id}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Technical inspection delete");
    $mapper = new TechnicalInspection($this->db, $this->jwt->uid);
    $mapper->delete($args['id']);
    return $response->withJson($args['id']);
});