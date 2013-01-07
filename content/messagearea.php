<div id="messagearea">

	<div id="messageareacontent">
		<span id="menusezione"><? echo $menusezione; ?>&nbsp;&gt;&nbsp;</span>
		<span id="menufunzione"><? echo $menufunzione; ?></span>
		<div id="operationarea"><? echo $operationarea; ?></div>
	</div>
	
</div>

<script type="text/javascript">

<?

if ($_SESSION['gotopagemessage'] != '') {
	echo "
	$(document).ready(function() {
		gotopagemessage = '" . $_SESSION['gotopagemessage'] . "';
		$.modaldialog.success(gotopagemessage, {
			timeout:1.5
		});
		gotopagemessage = '';
	});
	";
}

$_SESSION['gotopagemessage'] = '';

?>

</script>