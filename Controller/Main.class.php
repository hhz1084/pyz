<?php
class Main extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }
    public function actionIndex()
    {
        $this->tpl->display('main/index.html');
    }
}