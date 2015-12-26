<?php
class Index extends Controller{
    public function __construct()
    {
        parent::__construct();
        if (Interceptor::isLogin()){
            $this->location('/?m=main');
        }
    }
    public function actionIndex()
    {
        $error = !empty($_GET['error']) ? $_GET['error'] : '';
        
        $this->tpl->assign('error',$error);
        $this->tpl->display('index.html');
    }
}