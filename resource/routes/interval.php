<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/resource/intervals/{vehicleId}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Intervals list");
    $mapper = new Interval($this->db, $this->jwt->uid);
    $interval = $mapper->getINtervals($args['vehicleId']);
    return $response->withJson($interval);
});

$app->post('/resource/intervals/update', function (Request $request, Response $response, $args) {
    $this->logger->addInfo(" update");
    $mapper = new Interval($this->db, $this->jwt->uid);
    $d = json_decode(file_get_contents('php://input'));
    $interval = $mapper->saveInterval($d);
    return $response->withJson($interval);
});

$app->delete('/resource/intervals/{id}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo(" delete");
    $mapper = new Interval($this->db, $this->jwt->uid);
    $mapper->deleteInterval($args['id']);
    return $response->withJson($args['id']);
});