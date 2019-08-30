<?php

require "Dto/UserDto.php";

use \Firebase\JWT\JWT;
/**
 * Created by PhpStorm.
 * User: Martin
 * Date: 25. 5. 2017
 * Time: 17:11
 */
class Auth
{
    public $db;

    public $key;

    private $expiresIn = 60 * 60 * 24;

    public function __construct($db)
    {
        $this->db = $db;
//        $this->key = getenv("JWT_SECRET");
        $this->key = "my53cretp455w0rd";
    }

    private function findUser($user, $pass) {
        $query = $this->db->prepare('SELECT id FROM users WHERE email = ? AND pw_hash = ?');
        $query->execute(array($user, $pass));
        $result = $query->fetch();

        return $result['id'] ? $result['id'] : null;
    }

    public function login($d) {

        $userId = $this->findUser($d['username'], md5($d['password']));

        $accessToken = $this->getAccessToken($userId);
        $refreshToken = $this->getRefreshToken($userId);

        $jwt = JWT::encode($accessToken, $this->key);
        $refJwt = JWT::encode($refreshToken, $this->key);

        $payload = array(
            "user_id" => $userId,
            "access_token" => $jwt,
            "token_type" => "Bearer",
            "refresh_token" => $refJwt,
            "expires_in" => $this->expiresIn,
            "scope" => "",
            "authorities" => [],
            "jti" => ""
        );

        if ($userId) {
            return $payload;
        } else {
            return null;
        }
    }

    private function getAccessToken($uid) {
        return array(
            "uid" => $uid,
            "iss" => "vehicles",
            "aud" => "vehicles",
            "iat" => time(),
            "nbf" => time(),
            "exp" => time() + $this->expiresIn
        );
    }

    private function getRefreshToken($uid) {
        return array(
            "uid" => $uid,
            "iss" => "vehicles",
            "aud" => "vehicles",
            "iat" => time(),
            "nbf" => time(),
            "exp" => null
        );
    }

    public function getUserInfo($uid) {
        $query = $this->db->prepare('SELECT id, firstName, lastName FROM users WHERE id = ?');
        $query->execute(array($uid));
        return new UserDto($query->fetch());
    }

    public function refreshToken($d) {

//        $key = getenv("JWT_SECRET");

        if (!$this->key) return "no-key";

        if (!$d['refresh_token']) return "no-jwt";

        $oldJwt = JWT::decode($d['refresh_token'], $this->key, array('HS256'));
//        $decoded = JWT::decode($jwt, $key, array('HS256'));

        $user = $this->getUserInfo($oldJwt->uid);

        if (!$user) return null;

        $userId = $user->id;

        $accessToken = $this->getAccessToken($userId);
        $refreshToken = $this->getRefreshToken($userId);

        $jwt = JWT::encode($accessToken, $this->key);
        $refJwt = JWT::encode($refreshToken, $this->key);

        $payload = array(
            "user_id" => $userId,
            "access_token" => $jwt,
            "token_type" => "Bearer",
            "refresh_token" => $refJwt,
            "expires_in" => $this->expiresIn,
            "scope" => "",
            "authorities" => [],
            "jti" => ""
        );
        return $payload;
    }

    public function registerUser($email) {

        $result = new stdClass();
        if (!$email) {
            // bad request
            $result->status = 400;
            $result->message = 'Nebyl vyplněn žádný email!';
            return $result;
        }

        if ($this->_existsEmail($email)) {
            // conflict on email
            $result->status = 409;
            $result->message = 'Uživatel se zadaným emailem již existuje.';
            return $result;
        }
        
        $user = $this->_insertUser($email);
        
        if ($user) {
            $result->status = 200;
            $result->message = 'Uživatel byl úspěšně vytvořen.';
            return $result;
        }

    }

    function validateActivationCode($code) {

        $result = array(
            'code' => 0,
            'message' => ''
        );

        // code is empty
        if (!$code) {
            $result['code'] = 404;
            return $result;
        }

        $codeObj = $this->_findCode($code);
        
        // code not found
        if (!$codeObj) {
            $result['code'] = 404;
            return $result;
        }

        // expired
        if ($this->_isExpired($codeObj['codeExpiration'])) {
            $result['code'] = 403;
            return $result;
        }

        $result['code'] = 200;
        $result->message = $codeObj;
        return $result;

    }

    public function finishRegistration($d) {
        if ($d->code) {
            $pwd = md5($d->pwds->pwd);
            $query = $this->db->prepare('UPDATE users SET firstName = ?, lastName = ?, `pw_hash` = ? WHERE activationCode = ?');
            $query->execute(array($d->firstName, $d->lastName, $pwd, $d->code));
        }
    }

    private function _isExpired($exp) {
        $date = new DateTime();
        $now = $date->getTimestamp();

        return $exp < $now;
    }

    private function _findCode($code) {
        $query = $this->db->prepare('SELECT id, email, codeExpiration FROM users WHERE activationCode = ?');
        $query->execute(array($code));
        return $query->fetch();
    }

    private function _insertUser($email) {

        $code = $this->_generateCode();
        $codeExp = $this->_getExpiration(3600 * 24);

        $query = $this->db->prepare('INSERT INTO users (email, activationCode, codeExpiration)
            VALUES (?,?,?)');
        $query->execute(array($email, $code, $codeExp));
        return $this->db->lastInsertId();
    }

    private function _generateCode() {
        $code = [];
        for ($i = 0; $i < 32; $i++) {
            $code[] = rand(0,9);
        }
        return implode($code);
    }

    private function _getExpiration($exp = 86400) {
        $date = new DateTime();
        return $date->getTimestamp() + $exp;
    }

    private function _existsEmail($email) {
        $query = $this->db->prepare('SELECT id FROM users WHERE email LIKE ?');
        $query->execute(array($email));
        $result = $query->fetchAll();
        return $result && count($result) > 0 ? true : false;
    }
}