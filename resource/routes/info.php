<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/resource/info/{vehicleId}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Vehicle info " . $args['vehicleId']);
    $mapper = new Info($this->db, $this->jwt->uid);
    $info = $mapper->getInfo($args['vehicleId']);
    $newResponse = $response->withHeader('Content-type', 'application/json:charset=UTF-8');

    return $info ? $newResponse->withJson($info) : $newResponse->withJson($info, 404);
    
    // $response->getBody()->write(var_export($info, true));
    // return $response;
});

$app->post('/resource/info', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Info update");
    $mapper = new Info($this->db, $this->jwt->uid);
    $d = json_decode(file_get_contents('php://input'));
    $mapper->updateInfo($d);
    return $response->withJson($d);
});