<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/resource/stations', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Technical stations list");
    $mapper = new TechnicalStation($this->db, $this->jwt->uid);
    $station = $mapper->getStations();
    return $response->withJson($station);
});

$app->post('/resource/stations/update', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Technical station update");
    $mapper = new TechnicalStation($this->db, $this->jwt->uid);
    $d = json_decode(file_get_contents('php://input'));
    $mapper->update($d);
    return $response->withJson($d);
});

$app->delete('/resource/stations/{id}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Technical station delete");
    $mapper = new TechnicalStation($this->db, $this->jwt->uid);
    $mapper->deleteStation($args['id']);
    return $response->withJson($args['id']);
});