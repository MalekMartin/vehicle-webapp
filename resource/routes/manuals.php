<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->post('/resource/manual/new', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Manual add");
    $mapper = new Manuals($this->db, $this->jwt->uid);
    $file = $mapper->handleFile($args);

    return $file
        ? $response->withJson($file)
        : $response->withStatus(500);
});

$app->get('/resource/manual/{vehicleId}/all', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Get manuals for " . $args['vehicleId']);
    $mapper = new Manuals($this->db, $this->jwt->uid);
    $res = $mapper->getManuals($args['vehicleId']);
    return $response->withJson($res);
});
