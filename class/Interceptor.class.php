<?php
class Interceptor{
    private static $unInterModel = array(
        'User' => array('login'),
        'Validate'=>array('get'),
        'Index' =>array('index')
    );
    public static function init(){
        if (!self::_isLogin()){
            header('location:/');
        }
    }
    public static function isLogin()
    {
        return isset($_SESSION['is_login']) && $_SESSION['is_login'] == 1;
    }
    private static function _isLogin(){
        return self::checkController() || (isset($_SESSION['is_login']) && $_SESSION['is_login'] == 1);
    }
    private static function checkController()
    {
        $m = !empty($_REQUEST['m']) ? trim($_REQUEST['m']) : 'index';
        $m = ucfirst(strtolower($m));
        $a = !empty($_REQUEST['a']) ? trim($_REQUEST['a']) : 'index';
        if (isset(self::$unInterModel[$m]) && in_array($a, self::$unInterModel[$m])){
            return true;
        }
        return false;
    }
}