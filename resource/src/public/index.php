<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';

spl_autoload_register(function ($classname) {
    require ("../classes/" . $classname . ".php");
});

$dotenv = new Dotenv\Dotenv("../../");
$dotenv->load();
$dotenv->required(['JWT_SECRET'])->notEmpty();;

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$config['db']['host']   = "localhost";
$config['db']['user']   = getenv('DB_USER');
$config['db']['pass']   = getenv('DB_PWD');
$config['db']['dbname'] = "moto";
$jwtSecret =  getenv("JWT_SECRET");

$app = new \Slim\App(["settings" => $config]);

$container = $app->getContainer();

$container['logger'] = function($c) {
    $logger = new \Monolog\Logger('my_logger');
    $file_handler = new \Monolog\Handler\StreamHandler("../logs/app.log");
    $logger->pushHandler($file_handler);
    return $logger;
};

$container['db'] = function ($c) {
    $db = $c['settings']['db'];
    $pdo = new PDO("mysql:host=" . $db['host'] . ";dbname=" . $db['dbname'],
        $db['user'], $db['pass'], [PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"]);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $pdo;
};

$container["jwt"] = function ($c) {
    return new StdClass;
};
$app->add(new \Slim\Middleware\JwtAuthentication([
    "secure" => true,
    "relaxed" => ["localhost"],
    "path" => ["/"],
    "passthrough" => [
        "/auth/token",
        "/auth/token_refresh",
        "/admin/ping",
        "/auth/register",
        "/auth/validate_activation",
        "/auth/finish_registration"
    ],
    // "secret" => getenv("JWT_SECRET"),
    "secret" => $jwtSecret,
    "callback" => function ($request, $response, $arguments) use ($container) {
        $container["jwt"] = $arguments["decoded"];
    },
    "error" => function ($request, $response, $arguments) {
        $data["status"] = "error";
        $data["message"] = $arguments["message"];
        return $response
            ->withHeader("Content-Type", "application/json")
            ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }
]));

$container["jwtValid"] = function ($c) {
    return ($c['jwt']->uid || $c['jwt']->exp > time());
};


//$app->get('/hello/{name}', function (Request $request, Response $response) {
//    $name = $request->getAttribute('name');
//    $response->getBody()->write("Hello, $name");
//
//    return $response;
//});


// $app->any('/', function ($request, $response, $args) {
//     if (!$this->jwtValid) {return $response->withStatus(401)->withJson(array('message' => 'ha!'));}
// });
/**
* List of app routes
*/
require "../../routes/auth.php";
// require "../../routes/test.php";
require "../../routes/vehicle.php";
require "../../routes/file.php";
require "../../routes/fuel.php";
require "../../routes/info.php";
require "../../routes/seller.php";
require "../../routes/engine.php";
require "../../routes/tires.php";
require "../../routes/technicalInspecton.php";
require "../../routes/technicalStation.php";
require "../../routes/costCategory.php";
require "../../routes/cost.php";
require "../../routes/interval.php";
require "../../routes/maintenance.php";
require "../../routes/garage.php";
require "../../routes/repair.php";
require "../../routes/event.php";

$app->run();