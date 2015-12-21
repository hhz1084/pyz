<?php
class App{
    private static $db=null;
    public static $sess = null;
    private static $cache = null;
    public static function db(){
        if(self::$db == null){
            self::$db = new Mysql(DB_HOST, DB_USER, DB_PASS, DB_NAME, 3306);
        }
        return self::$db;
    }
    /**
     * @return ACache
     */
    public static function cache(){
        if(self::$cache === null){
            self::$cache = new ACache();
        }
        return self::$cache;
    }
    
}