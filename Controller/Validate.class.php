<?php
class Validate extends Controller
{
    public function actionGet()
    {
        $v = new ValidateCode();
        $v->doimg();
    }
}