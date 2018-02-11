<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->post('/resource/maintenance/update', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Maintenance update");
    $mapper = new Maintenance($this->db, $this->jwt->uid);
    $d = json_decode(file_get_contents('php://input'));
    $mapper->saveMaintenance($d);
    return $response->withJson($d);
});

$app->post('/resource/maintenance/finish', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Maintenance update");
    $mapper = new Maintenance($this->db, $this->jwt->uid);
    $d = json_decode(file_get_contents('php://input'));
    $repair = $mapper->finishMaintenance($d);
    return $response->withJson($repair);
});

$app->post('/resource/maintenance/delete', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Maintenances delete");
    $mapper = new Maintenance($this->db, $this->jwt->uid);
    $d = json_decode(file_get_contents('php://input'));
    $mapper->deleteMaintenance($d);
    return $response->withJson($d);
});

$app->post('/resource/maintenance/cancel', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Maintenance list");
    $mapper = new Maintenance($this->db, $this->jwt->uid);
    $d = json_decode(file_get_contents('php://input'));
    $maintenance = $mapper->cancelMaintenance($d);
    return $response->withJson($maintenance);
});

$app->post('/resource/maintenance/{vehicleId}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Maintenance list");
    $d = json_decode(file_get_contents('php://input'));
    $mapper = new Maintenance($this->db, $this->jwt->uid);
    $Maintenance = $mapper->getMaintenances($args['vehicleId'], $d);
    return $response->withJson($Maintenance);
});
