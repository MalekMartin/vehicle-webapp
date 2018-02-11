<?php

require "Dto/UserDto.php";

use \Firebase\JWT\JWT;

class JwtMapper 
{

    public $token;
    public $key = "my53cretp455w0rd";

    public function __construct($token)
    {
        $this->token = $token;
    }


    public function getUid() {
        $jwt = JWT::decode($d['refresh_token'], $this->key, array('HS256'));
        return $jwt->uid;
    }
}
