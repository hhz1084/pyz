<?php
class Order extends Controller
{
    public function actionIndex()
    {
        $p = isset($_GET['p']) ? (intval($_GET['p'])>0 ? intval($_GET['p']):1) : 1;
        $time = isset($_GET['t']) ? (in_array(strtolower($_GET['t']),array('asc','desc')) ? $_GET['t'] : -1) : -1;
        $paystatus = isset($_GET['s']) ? intval($_GET['s']) : -1; 
        $paytype = isset($_GET['type']) ? intval($_GET['type']) : -1;
        $sql = "SELECT o.*,od.userid,od.gametime,t.tablename,c.`name` FROM ha_order o 
            LEFT JOIN ha_orderdetail od ON od.orderid=o.orderid 
            LEFT JOIN ha_table t ON od.tableid=t.tableid 
            LEFT JOIN ha_club c ON t.clubid=c.clubid {{WHERE}} {{ORDER}} LIMIT ".($p-1)*self::PAGE_SIZE.','.self::PAGE_SIZE;
        
        $where = array();
        $order = array();
        if ($time !== -1){
            $order[] = 'order by o.createdate '.$time;
        }
        if ($paystatus !== -1){
            $where[] = 'o.paystatus='.$paystatus;
        }
        if ($paytype !== -1){
            $where[] = 'o.paytype='.$paytype;
        }
        $w = '';
        if (!empty($where)){
            $w = 'WHERE '.implode(' AND ', $where);
           
        }
        $sql = str_replace('{{WHERE}}', $w, $sql);
        $sql = str_replace('{{ORDER}}', implode(' ', $order), $sql);
        $data = App::db()->getAll($sql);
        
        $sql = "SELECT COUNT(1) FROM ha_order o ".$w;
        $count = App::db()->getOne($sql);
        $param = array(
            't'=>$time,
            's'=>$paystatus,
            'type'=>$paytype
        );
        $page = new Page($count,self::PAGE_SIZE);
        $page->url = '/?m=order&p=[page]&'.http_build_query($param);
        $this->tpl->assign('where',$param);
        $this->tpl->assign('data',$data);
        $this->tpl->assign('page',$page->show());
        $this->tpl->display('order/index.html');
    }
    public function actionOp()
    {
        if ($this->isPost()){
            $id = intval($_POST['id']);
            $sql = "select o.orderid,od.userid from ha_order o left join ha_orderdetail od ON o.orderid=od.orderid where o.orderid={$id}";
            $data = App::db()->getRow($sql);
            if (empty($data)){
                $this->json(405,'参数错误');
            }
            $ret = Api::cancelbook($data['userid'], $data['orderid']);
            if ($ret['code'] == 200){
                $this->json(200);
            }else{
                $this->json(500,'服务器错误');
            }
//             $val = $_POST['value'];
//             $sql = "UPDATE ha_order SET paystatus='{$val}' WHERE orderid={$id}";
//             if (App::db()->query($sql)){
//                 $this->json(200);
//             }else{
//                 $this->json(500,'服务器错误');
//             }
        }
    }
    public function actionDelete()
    {
        if ($this->isPost()){
            $id = $_POST['id'];
            
            $sql = "delete from ha_orderdetail where orderid={$id}";
            App::db()->query($sql);
            $sql1 = "delete from ha_order where orderid={$id}";
            if (App::db()->query($sql1)){
                $this->json(200);
            }else{
                $this->json(500,'删除失败');
            }
        }
    }
}