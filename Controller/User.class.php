<?php
class User extends Controller
{
    public function actionLogin()
    {
        $username = isset($_POST['username']) ? trim($_POST['username']) : '';
        $password = isset($_POST['password']) ? trim($_POST['password']) : '';
        $validate = isset($_POST['validate']) ? trim($_POST['validate']) : '';
        if (empty($username) || empty($password) || empty($validate)){
            $this->location('/',array('error'=>'参数错误'));
        }
        if (!ValidateCode::checkCode($validate)){
            $msg = '验证码错误';
            $this->location('/',array('error'=>$msg));
        }else{
            $sql = "SELECT * FROM ha_user WHERE usertype=4 and userstatus=1 and userid='{$username}' and password='{$password}'";
            $data = App::db()->getRow($sql);
            if (!empty($data)){
                $_SESSION['user'] = $data;
                $_SESSION['is_login'] = 1;
                $code = 200;
                $this->location('/',array('m'=>'main'));
            }else{
                $code = 401;
                $msg = '用户名或密码错误';
                $this->location('/',array('error'=>$msg));
            }
        }
    }
    public function actionLogout()
    {
        $_SESSION['is_login'] = 0;
        $_SESSION['user'] = array();
        $this->location('/');
    }
}