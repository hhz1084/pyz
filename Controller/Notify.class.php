<?php
class Notify extends Controller
{
    public function actionIndex()
    {
        $this->tpl->display('notify/index.html');
    }
}