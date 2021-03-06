<?php
class Banner extends Controller
{
    public function actionIndex()
    {
        $p = isset($_GET['p']) ? (intval($_GET['p'])>0 ? intval($_GET['p']):1) : 1;
        $sql = "select * from ha_carousel order by id desc LIMIT ".($p-1)*self::PAGE_SIZE.','.self::PAGE_SIZE;
        $data = App::db()->getAll($sql);
        
        $sql = "SELECT COUNT(1) FROM ha_carousel";
        $count = App::db()->getOne($sql);
        
        $page = new Page($count,self::PAGE_SIZE);
        $page->url = '/?m=banner&p=[page]';
        $this->tpl->assign('data',$data);
        $this->tpl->assign('page',$page->show());
        $this->tpl->display('banner/index.html');
    }
    public function actionAdd()
    {
        $this->tpl->display('banner/add.html');
    }
    public function actionEdit()
    {
        $id = isset($_GET['id']) ? intval($_GET['id']) : '';
        if (empty($id)){
            $this->location('/?m=banner');
        }
        $sql = "select * from ha_carousel where id={$id}";
        $data = App::db()->getRow($sql);
        if (empty($data)){
            $this->location('/?m=banner');
        }
        $this->tpl->assign('data',$data);
        $this->tpl->display('banner/edit.html');
    }
    public function actionSave()
    {
        if ($this->isPost()){
            $url = $_POST['url'];
            if (is_uploaded_file($_FILES['file']['tmp_name'])){
                $path = $this->saveFile($_FILES['file']);
            }else{
                $this->back('图片文件不能为空');
            }
            $sql = "insert into ha_carousel(path,url,createdate) values ('$path','$url',now())";
            if (App::db()->query($sql)){
                $this->location('/?m=banner');
            }else{
                $this->back('添加失败');
            }
        }
    }
    public function actionEditsave()
    {
        if ($this->isPost()){
            
            $id = $_POST['id'];
            $sql = "select * from ha_carousel where id={$id}";
            $data = App::db()->getRow($sql);
            $path = $data['path'];
            $url = $_POST['url'];
            if (is_uploaded_file($_FILES['file']['tmp_name'])){
                $path = $this->saveFile($_FILES['file']);
                @unlink(rtrim(IMAGE_PATH,'/').'/'.ltrim($data['path']));
            }
            $sql = "update ha_carousel set path='$path',url='$url' where id=$id";
            if (App::db()->query($sql)){
                $this->location('/?m=banner');
            }else{
                $this->back('保存失败');
            }
        }
    }
    public function saveFile($file)
    {
        $path = APP_PATH.trim(IMAGE_PATH,'/');
        if (is_uploaded_file($file['tmp_name'])){
            $filename = uniqid(chr(mt_rand(65, 90)).'_');
            $type = explode('.', $file['name']);
            $type = array_pop($type);
            if(move_uploaded_file($file['tmp_name'], $path.'/'.$filename.'.'.$type)){
                return '/'.trim(IMAGE_PATH,'/').'/'.$filename.'.'.$type;
            }
        }
        return false;
    }
    public function actionDelete()
    {
        if ($this->isPost()){
            $id = $_POST['id'];
            $sql = "select * from ha_carousel where id={$id}";
            $data = App::db()->getRow($sql);
            $image = ltrim($data['image'],'/');
            $sql = "delete from ha_carousel where id={$id}";
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
}