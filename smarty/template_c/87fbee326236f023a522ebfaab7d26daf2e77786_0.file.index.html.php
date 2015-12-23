<?php
/* Smarty version 3.1.29, created on 2015-12-23 15:03:40
  from "E:\HHZ\Git\pyz\smarty\template\index.html" */

if ($_smarty_tpl->smarty->ext->_validateCompiled->decodeProperties($_smarty_tpl, array (
  'has_nocache_code' => false,
  'version' => '3.1.29',
  'unifunc' => 'content_567aa9bcc52204_76274471',
  'file_dependency' => 
  array (
    '87fbee326236f023a522ebfaab7d26daf2e77786' => 
    array (
      0 => 'E:\\HHZ\\Git\\pyz\\smarty\\template\\index.html',
      1 => 1450876863,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_567aa9bcc52204_76274471 ($_smarty_tpl) {
?>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8" />
		<title>Dashboard</title>
		<link rel="stylesheet" href="/css/bootstrap.min.css" />
		<link rel="stylesheet" type="text/css" href="/css/style.css" />
		<style>
		.body{
			margin-top:10%;
		}
		</style>
	</head>

	<body>
		<div class="container header">
			<header>
				<h1><a href="index.html">Dashboard</a></h1>
			</header>
		</div>
		<div class="container body">
			<form class="form-inline" action="/?m=user&a=login" method="post">
			  <div class="form-group">
			    <label for="username">用户名：</label>
			    <input type="text" class="form-control" name="username" id="username" placeholder="">
			  </div>
			  &nbsp;&nbsp;&nbsp;&nbsp;
			  <div class="form-group">
			    <label for="password">密码：</label>
			    <input type="password" class="form-control" name="password" id="password" placeholder="">
			  </div>&nbsp;&nbsp;&nbsp;&nbsp;
			  <div class="form-group">
			    <label for="password">验证码：</label>
			    <input type="text" class="form-control" name="validate" id="validate" placeholder="">
			    <img src="/?m=validate&a=get" alt="" />
			  </div>&nbsp;&nbsp;&nbsp;&nbsp;
			  <div class="form-group">
			  	<button type="submit" class="btn btn-danger" id="login">登录</button>
			  </div>
			  <?php if (!empty($_smarty_tpl->tpl_vars['error']->value)) {?>
			  <div class="form-group" style="margin-top:10px;">
			  	<div class="alert alert-danger" id="errorMsg" style="width:525px;margin: 0 auto;">
			  	<?php echo $_smarty_tpl->tpl_vars['error']->value;?>

			  	</div>
			  </div>
			  <?php }?>
			</form>
		</div>
		<?php echo '<script'; ?>
>
		<?php echo '</script'; ?>
>
	</body>
</html><?php }
}
