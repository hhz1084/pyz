<?php
error_reporting(E_ALL);
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'h8');
$path = array(
    APP_PATH.'class/',
    APP_PATH.'Controller/',
    APP_PATH.'libs/'
);
new ClassAutoloader($path);
class ClassAutoloader {
    private $path = array();
    public function __construct($path) {
        $this->path = $path;
        spl_autoload_register(array($this, 'loader'));
    }
    private function loader($className) {
        foreach ($this->path as $p){
            if (is_file($p.$className.'.class.php')){
                include_once $p.$className.'.class.php';
            }
        }
    }
}