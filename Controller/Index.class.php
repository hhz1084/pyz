<?php
class Index extends Controller{
    public function __construct()
    {
        parent::__construct();
    }
    public function actionIndex()
    {
        $error = !empty($_GET['error']) ? $_GET['error'] : '';
        
        $this->tpl->assign('error',$error);
        $this->tpl->display('index.html');
    }
}