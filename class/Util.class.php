<?php
class Util{
    public static function response($data){
        !isset($data['code']) && ($data['code'] = 200);
        $state = self::getHttpState($data['code']);
        ob_clean();
        header('Content-Type:application/json; charset=utf-8');
        header(HTTP::getState($state));
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
        die();
    }
    private static function getHttpState($code){
        $c = substr($code,0,3);
        return intval($c);
    }
    
}