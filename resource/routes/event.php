<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/resource/events', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Vehicles events");
    $mapper = new Event($this->db, $this->jwt->uid);
    $events = $mapper->getLastEvents();
    return $response->withJson($events);
});

$app->get('/resource/events/expired', function (Request $request, Response $response, $args) {
    // $this->logger->addInfo("Ex");
    $mapper = new Event($this->db, $this->jwt->uid);
    // $events = $mapper->getExpiredMaintenances();
    $events = $mapper->getExpiredTks();
    return $response->withJson($events);
});
