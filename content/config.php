<?
$version = 'gestisf 0.2 - 16 Aprile 2011';

$db_host = 'localhost';
$db_user = 'root';
$db_password = '';
$db_name = 'rodenicc_walks';

// $db_password = '1sf4m33t1ngs';
// $db_name = 'walks_ticketing';

$db_connection = mysql_connect($db_host, $db_user, $db_password);
if ($db_connection == false) die ("Errore nella connessione! Impossibile accedere al database.");
mysql_select_db($db_name, $db_connection) or die ("Errore nella selezione del database! Impossibile accedere al database dell'applicazione.");

$bbb_server_ip = 'isf-bbb.sinapto.net';
$bbb_security_salt = 'b37d7834c09a6c29dff9ce81e129c5b2';

?>