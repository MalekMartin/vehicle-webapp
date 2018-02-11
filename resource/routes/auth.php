<?php
/**
 * Created by PhpStorm.
 * User: Martin
 * Date: 25. 5. 2017
 * Time: 17:13
 */

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->post('/auth/token', function (Request $request, Response $response) {
    $this->logger->addInfo("Auth generate token");
    $mapper = new Auth($this->db);
    $token = $mapper->login($request->getParsedBody());
    if ($token) {
        return $response->withJson($token);
    } else {
        return $response->withStatus(400);
    }
});

$app->get('/auth/account', function (Request $request, Response $response) {

    if (!$this->jwt->uid || $this->jwt->exp < time()) return $response->withStatus(401);

    $this->logger->addInfo("User info");
    $mapper = new Auth($this->db);
    $user = $mapper->getUserInfo($this->jwt->uid);
    return $response->withJson($user);
});

$app->post('/auth/token_refresh', function (Request $request, Response $response) {

    $this->logger->addInfo("Refresh token");
    $mapper = new Auth($this->db);
    $token = $mapper->refreshToken($request->getParsedBody());


    return $response->withJson($token);
});

$app->post('/auth/register', function (Request $request, Response $response) {
    
    $this->logger->addInfo("Register user");
    $mapper = new Auth($this->db);
    $data = json_decode(file_get_contents('php://input'));
    $result = $mapper->registerUser($data->mail);

    return $response->withJson($result->message, $result->status);
});

$app->get('/auth/validate_activation/{code}', function (Request $request, Response $response, $args) {
    
    $this->logger->addInfo("Validate activation code");
    $mapper = new Auth($this->db);
    $result = $mapper->validateActivationCode($args['code']);;

    return $response->withJson($result, $result['code']);
});

$app->post('/auth/finish_registration', function (Request $request, Response $response) {
    
    $this->logger->addInfo("Registration finish");
    $mapper = new Auth($this->db);
    $data = json_decode(file_get_contents('php://input'));
    $result = $mapper->finishRegistration($data);

    return $response->withStatus(200);
});

