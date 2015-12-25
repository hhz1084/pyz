<?php
class Notify extends Controller
{
    public function actionIndex()
    {
        $p = isset($_GET['p']) ? (intval($_GET['p'])>0 ? intval($_GET['p']):1) : 1;
        $sql = "SELECT * FROM ha_systemnotify ORDER BY id desc LIMIT ".($p-1)*self::PAGE_SIZE.','.self::PAGE_SIZE;
        $data = App::db()->getAll($sql);
        $sql = "SELECT COUNT(1) FROM ha_systemnotify";
        $count = App::db()->getOne($sql);
        
        $page = new Page($count,self::PAGE_SIZE);
        $page->url = '/?m=notify&p=[page]';
        $this->tpl->assign('data',$data);
        $this->tpl->assign('page',$page->show());
        $this->tpl->display('notify/index.html');
    }
    public function actionDelete()
    {
        if ($this->isPost()){
            $id = intval($_POST['id']);
            if ($id > 0){
                $sql = "delete from ha_systemnotify where id={$id}";
                if (App::db()->query($sql)){
                    $this->json(200);
                }else{
                    $this->json(500,'删除失败');
                }
            }else{
                $this->json(406,'参数错误');
            }
        }
    }
    public function actionAdd()
    {
        $this->tpl->display('notify/add.html');
    }
    public function actionEdit()
    {
        $id = isset($_GET['id']) ? intval($_GET['id']) : '';
        if (empty($id)){
            $this->location('/?m=notify');
        }
        $sql = "select * from ha_systemnotify where id={$id}";
        $data = App::db()->getRow($sql);
        if (empty($data)){
            $this->location('/?m=notify');
        }
        $this->tpl->assign('data',$data);
        $this->tpl->display('notify/edit.html');
    }
    public function actionSave()
    {
        if ($this->isPost()){
            $title = $_POST['title'];
            $content = $_POST['content'];
            $sql = "insert into ha_systemnotify(title,content,createdate) values ('$title','$content',now())";
            if (App::db()->query($sql)){
                $this->location('/?m=notify');
            }else{
                $this->back('添加失败');
            }
        }
    }
    public function actionEditsave()
    {
        if ($this->isPost()){
            $id = $_POST['id'];
            $title = $_POST['title'];
            $content = $_POST['content'];
            $sql = "select * from ha_systemnotify where id={$id}";
            $data = App::db()->getRow($sql);
            
            $sql = "update ha_systemnotify set `title`='$title',content='$content' where id=$id";
            if (App::db()->query($sql)){
                $this->location('/?m=notify');
            }else{
                $this->back('保存失败');
            }
    
        }
    }
    public function actionSend()
    {
        if ($this->isPost()){
            $id = $_POST['id'];
            $sql = "SELECT * FROM ha_systemnotify WHERE id=$id";
            $data = App::db()->getRow($sql);
            $title = $data['title'];
            $content = $data['content'];
            if ($this->sendApi($title, $content)){
                $sql = "UPDATE ha_systemnotify SET sendtime=now(),sendflag=1 WHERE id={$id}";
                if (App::db()->query($sql)){
                    $this->json(200);
                }else{
                    $this->json(500,'服务器错误');
                }
            }else{
                $this->json(500,'推送失败');
            }
        }
    }
    private function sendApi($title,$content)
    {
        //推送接口
        return true;
    }
}