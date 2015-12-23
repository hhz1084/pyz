<?php
class Controller{
    public $tpl = null;
    public function __construct(){
        Interceptor::init();
        $this->tpl = new Smarty();
        $this->tpl->left_delimiter = '{{';
        $this->tpl->right_delimiter = '}}';
        $this->tpl->setTemplateDir(APP_PATH.'smarty/template');
        $this->tpl->setCompileDir(APP_PATH.'smarty/template_c');
        $this->tpl->setCacheDir(APP_PATH.'smarty/cache');
    }
    public function json($code,$msg = ''){
        $this->toJson(array('code'=>$code,'msg'=>$msg));
    }
    public function location($url,$param = array()){
        $url .= (strpos($url, '?') === false ? '?': '&') .http_build_query($param);
        header('location:'.$url);
        die();
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
    protected function back($msg) {
        header('Content-type:text/html;charset=utf-8');
        echo '<script>alert("'.$msg.'");history.back(-1);</script>';
        die();
    }
}