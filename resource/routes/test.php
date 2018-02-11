<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/tickets', function (Request $request, Response $response) {
    $this->logger->addInfo("Ticket list");
    $mapper = new Test($this->db);
    $tickets = $mapper->getTestData();

    // $response->getBody()->write(var_export($tickets, true));
    // return $response;
    return $response->withJson($tickets,201);
});