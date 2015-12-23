<?php
class Banner extends Controller
{
    public function actionIndex()
    {
        $sql = "select * from ha_banner";
        $data = App::db()->getAll($sql);
        
        $this->tpl->assign('data',$data);
        $this->tpl->display('banner/index.html');
    }
    public function actionAdd()
    {
        $this->tpl->display('banner/add.html');
    }
    public function actionSave()
    {
        if ($this->isPost()){
            $name = $_POST['name'];
            $weight = intval($_POST['weight']);
            $file = $this->saveFile($_FILES['file']);
            if ($file){
                $sql = "insert into ha_banner(name,weight,image) values ('$name','$weight','$file')";
                if (App::db()->query($sql)){
                    $this->location('/?m=banner');
                }else{
                    $this->back('添加失败');
                }
            }else{
                $this->back('文件上传错误');
            }
        }
    }
    public function saveFile($file)
    {
        $path = APP_PATH.'img/banner/';
        if (is_uploaded_file($file['tmp_name'])){
            $filename = uniqid('B_');
            $type = explode('.', $file['name']);
            $type = array_pop($type);
            if(move_uploaded_file($file['tmp_name'], $path.$filename.'.'.$type)){
                return '/img/banner/'.$filename.'.'.$type;
            }
        }
        return false;
    }
    public function actionDelete()
    {
        if ($this->isPost()){
            $id = $_POST['id'];
            $sql = "select * from ha_banner where id={$id}";
            $data = App::db()->getRow($sql);
            $image = ltrim($data['image'],'/');
            $sql = "delete from ha_banner where id={$id}";
            if (App::db()->query($sql)){
                if (is_file(APP_PATH.$image)){
                    unlink(APP_PATH.$image);
                }
                $this->json(200);
            }else{
                $this->json(500,'删除失败');
            }
        }
    }
    public function actionOp()
    {
        if ($this->isPost()){
            $id = $_POST['id'];
            $key = $_POST['key'];
            $val = $_POST['value'];
            $sql = "UPDATE ha_banner SET {$key}='{$val}' WHERE id={$id}";
            if (App::db()->query($sql)){
                $this->json(200);
            }else{
                $this->json(500,'服务器错误');
            }
        }
    }
}