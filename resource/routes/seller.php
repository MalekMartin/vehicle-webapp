<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/resource/seller/{vehicleId}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Seler info" . $args['vehicleId']);
    $mapper = new Seller($this->db, $this->jwt->uid);
    $seller = $mapper->getSeller($args['vehicleId']);
    return $response->withJson($seller);
});

$app->post('/resource/seller/{vehicleId}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Seler update" . $args['vehicleId']);
    $mapper = new Seller($this->db, $this->jwt->uid);
    $d = json_decode(file_get_contents('php://input'));
    $seller = $mapper->update($d);
    return $response->withJson($d);
});

$app->post('/resource/buyer/{vehicleId}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Seler update" . $args['vehicleId']);
    $mapper = new Buyer($this->db, $this->jwt->uid);
    $d = json_decode(file_get_contents('php://input'));
    $seller = $mapper->update($d);
    return $response->withJson($d);
});