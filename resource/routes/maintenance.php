<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Slim\Http\Response as Response;

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
    // $this->logger->addInfo("Maintenance list");
    $mapper = new Maintenance($this->db, $this->jwt->uid);
    $Maintenance = $mapper->getMaintenances($args['vehicleId'], $request->getParsedBody());
    return $response->withJson($Maintenance);
});

$app->get('/resource/maintenance/{vehicleId}/expired', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Expired maintenance count");
    $mapper = new Maintenance($this->db, $this->jwt->uid);
    $m = $mapper->getExpiredCount($args['vehicleId']);
    return $response->withJson($m);
});

$app->get('/resource/maintenance/{vehicleId}/all', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Get all maintenances");
    $mapper = new Maintenance($this->db, $this->jwt->uid);
    $m = $mapper->getAllMaintenances($args['vehicleId']);
    return $response->withJson($m);
});
