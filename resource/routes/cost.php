<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->post('/resource/all-costs/{vehicleId}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Costs list");
    $mapper = new Cost($this->db, $this->jwt->uid);
    $filter = json_decode(file_get_contents('php://input'));
    $cost = $mapper->getPageableCosts($args['vehicleId'], $filter);
    return $response->withJson($cost);
});

$app->get('/resource/cost/{id}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Get cost");
    $mapper = new Cost($this->db, $this->jwt->uid);
    $cost = $mapper->getCost($args['id']);
    return $response->withJson($cost);
});

$app->get('/resource/costs/{id}/all', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Get all costs");
    $mapper = new Cost($this->db, $this->jwt->uid);
    $costs = $mapper->getAllCosts($args['id']);
    return $response->withJson($costs);
});

$app->get('/resource/costs/{id}/stats', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Get cost stats");
    $mapper = new Cost($this->db, $this->jwt->uid);
    $cost = $mapper->getCostStats($args['id']);
    return $response->withJson($cost);
});

$app->get('/resource/costs/{id}/category-stats', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Get cost by category stats");
    $mapper = new Cost($this->db, $this->jwt->uid);
    $cost = $mapper->getCostsByCategory($args['id']);
    return $response->withJson($cost);
});

$app->post('/resource/costs/update', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Cost update");
    $mapper = new Cost($this->db, $this->jwt->uid);
    $d = json_decode(file_get_contents('php://input'));
    $mapper->saveCosts($d);
    return $response->withJson($d);
});

$app->delete('/resource/costs/{id}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Cost delete");
    $mapper = new Cost($this->db, $this->jwt->uid);
    $mapper->delete($args['id']);
    return $response->withJson($args['id']);
});