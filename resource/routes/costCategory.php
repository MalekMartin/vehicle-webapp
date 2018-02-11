<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/resource/cost-category', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Cost categories list");
    $mapper = new CostCategory($this->db, $this->jwt->uid);
    $cost = $mapper->getCategories();
    return $response->withJson($cost);
});

$app->post('/resource/cost-category/update', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Cost category update");
    $mapper = new CostCategory($this->db, $this->jwt->uid);
    $d = json_decode(file_get_contents('php://input'));
    $mapper->saveCategory($d);
    return $response->withJson($d);
});

$app->delete('/resource/cost-category/{id}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Cost category delete");
    $mapper = new CostCategory($this->db, $this->jwt->uid);
    $mapper->delete($args['id']);
    return $response->withJson($args['id']);
});