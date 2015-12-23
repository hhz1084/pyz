<?php
class Filter{
    public static function input(){
        foreach ($_POST as $k=>$v){
            $_POST[$k] = self::_addslashes($v);
        }
        foreach ($_GET as $k=>$v){
            $_GET[$k] = self::_addslashes($v);
        }
        foreach ($_REQUEST as $k=>$v){
            $_REQUEST[$k] = self::_addslashes($v);
        }
    }
    private static function _addslashes($val){
        if (is_array($val)){
            return $val;
        }
        $val = trim($val);
        return !get_magic_quotes_gpc() ? addslashes($val):$val;
    }
}