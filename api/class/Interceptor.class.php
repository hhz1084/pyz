<?php
class Interceptor{
    private static $unInterModel = array(
        'User' => array('login'),
        'Validate'=>array('get')
    );
    public static function init(){
        return self::isLogin();
    }
    private static function isLogin(){
        return self::checkController() || (isset($_SESSION['is_login']) && $_SESSION['is_login'] == 1);
    }
    private static function checkController()
    {
        $m = ucfirst(strtolower($_REQUEST['m']));
        $a = $_REQUEST['a'];
        if (isset(self::$unInterModel[$m]) && in_array($a, self::$unInterModel[$m])){
            return true;
        }
        return false;
    }
}