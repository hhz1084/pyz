<?php
class Controller{
    public function __construct(){
        if (Interceptor::init() === false){
            Util::response(array('code'=>401,'msg'=>'Request not authorized'));
        }
    }
    public function json($code,$msg = ''){
        $this->toJson(array('code'=>$code,'msg'=>$msg));
    }
    public function toJson($data){
        $res = array();
        if (!isset($data['code'])){
            $res['code'] = 200;
            $res['msg'] = '获取成功';
            $res['data'] = $data;
        }else{
            $res = $data;
        }
        Util::response($res);
    }
    protected function table($name){
        return $GLOBALS['dbq']->table($name);
    }
    protected function pr($data)
    {
        echo '<pre>';
        print_r($data);
        echo '</pre>';
    }
    protected function isAjax(){
      if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
        return true;
      }else{
        return false;
      }
    }
    protected function isGet(){
      return $_SERVER['REQUEST_METHOD'] == 'GET' ? true : false;
    }
    protected function isPost() {
      return ($_SERVER['REQUEST_METHOD'] == 'POST' && (empty($_SERVER['HTTP_REFERER']) || preg_replace("~https?:\/\/([^\:\/]+).*~i", "\\1", $_SERVER['HTTP_REFERER']) == preg_replace("~([^\:]+).*~", "\\1", $_SERVER['HTTP_HOST']))) ? 1 : 0;
    }
    protected function admin_priv($priv_str, $msg_type = '' , $msg_output = false){
        if (!admin_priv($priv_str,$msg_type,$msg_output)){
            $this->toJson(array('code'=>403,'msg'=>Lang::i('priv_error', 'common')));
        }
    }
    protected function check_authz_json($authz){
        if (!check_authz($authz)){
            $this->toJson(array('code'=>403,'msg'=>$GLOBALS['_LANG']['priv_error']));
        }
    }
    protected function clearAll()
    {
        clear_cache_files();
        App::cache()->clearAll();
    }
    protected function clear()
    {
        App::cache()->clearAll();
    }
}