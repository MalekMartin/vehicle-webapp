<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->post('/resource/repairs/update', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Repair update");
    $mapper = new Repair($this->db, $this->jwt->uid);
    $d = json_decode(file_get_contents('php://input'));
    $mapper->update($d);
    return $response->withJson($d);
});

$app->post('/resource/repairs/save-task', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Task update");
    $mapper = new Repair($this->db, $this->jwt->uid);
    $d = json_decode(file_get_contents('php://input'));
    $mapper->saveTask($d);
    return $response->withJson($d);
});

$app->post('/resource/repairs/{vehicleId}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Repairs list" . $args['vehicleId']);
    $mapper = new Repair($this->db, $this->jwt->uid);
    $d = json_decode(file_get_contents('php://input'));
    $repair = $mapper->getPageableRepairs($args['vehicleId'], $d);
    return $response->withJson($repair);
});

$app->get('/resource/repairs/{vehicleId}/tasks', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Repair tasks list" . $args['vehicleId']);
    $mapper = new Repair($this->db, $this->jwt->uid);
    $tasks = $mapper->findTasks($args['vehicleId']);
    return $response->withJson($tasks);
});

$app->get('/resource/repairs/{vehicleId}/maintenances/{repairId}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Repair maintenances list" . $args['vehicleId']);
    $mapper = new Repair($this->db, $this->jwt->uid);
    $data = $mapper->getMaintenancesByRepairId($args['vehicleId'], $args['repairId']);
    return $response->withJson($data);
});

$app->delete('/resource/repairs/task/{id}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Repair task delete " . $args['id']);
    $mapper = new Repair($this->db, $this->jwt->uid);
    $repair = $mapper->deleteTask($args['id']);
    return $response->withJson($args['id']);
});

$app->delete('/resource/repairs/{id}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Repairs delete " . $args['id']);
    $mapper = new Repair($this->db, $this->jwt->uid);
    $repair = $mapper->delete($args['id']);
    return $response->withJson($args['id']);
});

$app->get('/resource/repairs/{id}/stats', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Repair get " . $args['id']);
    $mapper = new Repair($this->db, $this->jwt->uid);
    $repair = $mapper->getStats($args['id']);
    return $response->withJson($repair);
});

$app->get('/resource/repair/{id}', function (Request $request, Response $response, $args) {
    $this->logger->addInfo("Repair get " . $args['id']);
    $mapper = new Repair($this->db, $this->jwt->uid);
    $repair = $mapper->getRepair($args['id']);
    return $response->withJson($repair);
});