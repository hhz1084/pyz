<?php
class Club extends Controller
{
    public function actionIndex()
    {
        $p = isset($_GET['p']) ? (intval($_GET['p'])>0 ? intval($_GET['p']):1) : 1;
        $status = isset($_GET['t']) ? intval($_GET['t']) : -1; 
        $sql = "SELECT * FROM ha_club {{WHERE}} LIMIT ".($p-1)*self::PAGE_SIZE.','.self::PAGE_SIZE;
        
        $where = array();
        $order = array();
        if ($status !== -1){
            $where[] = 'status='.$status;
        }
        $w = '';
        if (!empty($where)){
            $w = 'WHERE '.implode(' AND ', $where);
        }
        $sql = str_replace('{{WHERE}}', $w, $sql);
        $data = App::db()->getAll($sql);
        
        $sql = "SELECT COUNT(1) FROM ha_club ".$w;
        $count = App::db()->getOne($sql);
        $param = array(
            't'=>$status
        );
        $page = new Page($count,self::PAGE_SIZE);
        $page->url = '/?m=club&p=[page]&'.http_build_query($param);
        $this->tpl->assign('where',$param);
        $this->tpl->assign('data',$data);
        $this->tpl->assign('page',$page->show());
        $this->tpl->display('club/index.html');
    }
    public function actionOp()
    {
        if ($this->isPost()){
            $id = $_POST['id'];
            $val = $_POST['value'];
            $sql = "UPDATE ha_club SET status='{$val}' WHERE clubid={$id}";
            if (App::db()->query($sql)){
                $this->json(200);
            }else{
                $this->json(500,'服务器错误');
            }
        }
    }
}