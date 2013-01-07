<?
$pagename = 'logout';
include ('config.php');
include ('ajax_init.php');
include ('header.php');
?>

<body onload="logout();">

<form name="formlogout" id="formlogout" action="index.php" method="get">
	<input type="hidden" name="esito" id="esito" value="logout">
</form>
<script type="text/javascript">
logout();
</script>

</body>
</html>