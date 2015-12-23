<?php
/* Smarty version 3.1.29, created on 2015-12-23 14:37:56
  from "E:\HHZ\Git\pyz\smarty\template\main\index.html" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_567aa3b42ee6d5_66973182',
  'file_dependency' => 
  array (
    '9b70c0719aa7ee60850a4d65ccf35a851b72e075' => 
    array (
      0 => 'E:\\HHZ\\Git\\pyz\\smarty\\template\\main\\index.html',
      1 => 1450877874,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_567aa3b42ee6d5_66973182 ($_smarty_tpl) {
?>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8" />
		<title>Dashboard</title>
		<link rel="stylesheet" href="/css/bootstrap.min.css" />
		<link rel="stylesheet" type="text/css" href="/css/style.css" />
	</head>

	<body>
		<div class="container header clearfix">
			<header class="clearfix">
				<h1><a href="index.html">Dashboard</a></h1>
				<a href="/?m=user&a=logout" class="btn logout">退出</a>
			</header>
		</div>
		<div class="body clearfix">
			<div class="left">
				<ul class="list-group">
				  <li class="list-group-item"><a href="/?m=banner">图片轮播管理</a></li>
				  <li class="list-group-item"><a href="/?m=notice">公告管理</a></li>
				  <li class="list-group-item"><a href="/?m=order">订单管理</a></li>
				  <li class="list-group-item"><a href="/?m=club">棋牌室管理</a></li>
				  <li class="list-group-item"><a href="/?m=user&a=logout">退出</a></li>
				</ul>
			</div>
			<div class="right">
			
			</div>
		</div>
		<?php echo '<script'; ?>
>
		<?php echo '</script'; ?>
>
	</body>
</html><?php }
}
