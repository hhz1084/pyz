<?php
class Api
{
    public static function publishsystemnotify($userId,$title,$content,$sendTime)
    {
        $url = self::_getHost().'/happy8/publishsystemnotify?userid='.$userId;
        $data = array(
            'title'=>$title,
            'content'=>$content,
            'sendTime'=>$sendTime
        );
        return self::_request($url,$data);
    }
    public static function cancelbook($userId,$orderId)
    {
        $url = self::_getHost().'/happy8/cancelbook?'.http_build_query(array(
            'userid'=>$userId,'orderid'=>$orderId
        ));
        return self::_request($url,'GET');
    }
    private static function _request($url,$data = array(),$method = 'POST')
    {
        $data = json_encode($data);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        if (strtoupper($method) == 'POST'){
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json',
                'Content-Length: ' . strlen($data))
            );
        }
        curl_exec($ch);
        $code = curl_getinfo($ch,CURLINFO_HTTP_CODE);
        curl_close($ch);
        return self::_parseCode($code);
    }
    private static function _getHost()
    {
        return rtrim(API_URL,'/');
    }
    private static function _parseCode($code)
    {
        $msg = '';
        switch ($code){
            case 200:
                $msg = '成功';
                break;
            case 400:
                $msg = '请求格式错误';
                break;
            case 405:
                $msg = '权限不够';
                break;
            case 500:
                $msg = '服务器内部错误';
                break;
            default:
                $msg = '其他未知错误';
                break;
        }
        return array('code'=>$code,'msg'=>$msg);
    }
}