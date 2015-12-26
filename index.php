<?php
session_start();
date_default_timezone_set('PRC');
define('APP_PATH', str_replace('\\', '/', __DIR__.'/'));
include_once './init/init.php';
try {
    Filter::input();
    $m = !empty($_REQUEST['m']) ? trim($_REQUEST['m']) : 'index';
    $m = ucfirst(strtolower($m));
    $a = !empty($_REQUEST['a']) ? trim($_REQUEST['a']) : 'index';
    if (empty($m)){
        throw new Exception('module is empty');
    }
    if (!class_exists($m)){
        throw new Exception("class {$m} is not exists");
    }
    
    if (empty($a)){
        throw new Exception('action is empty');
    }
    $module = new $m;
    $action = 'action'.ucfirst($a);
    if (!method_exists($module, $action)){
        throw new Exception("action {$a} is not exists");
    }
    $module->$action();
}catch (Exception $e){
    Util::response(array('code'=>400,'msg'=>$e->getMessage()));
}