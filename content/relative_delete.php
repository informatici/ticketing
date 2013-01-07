<?
$pagename = 'relative_delete';
include ('config.php');
include ('ajax_init.php');
if (!isset($_SESSION["relative_creation"])) {
	$url = 'main.php';
	header('Location: ' . $url);	
}
include ('header.php');
?>

<body>

<?	include ('menu.php'); ?>

<div id="container">

<? 
$operationarea = "	<input type='button' name='submit:mainform' id='submit:mainform' value='cancella' />
					<input type='button' name='cancel' id='cancel' value='&lt;- indietro' />";

include ('messagearea.php');

?>

	<div id="content">
	
		<form name="mainform" id="mainform" action="#" method="post" class="sjbjl_form">
			
			<input type="hidden" name="pagename" id="pagename" value="<? echo $pagename; ?>"></input>
			<input type="hidden" name="id" id="id" value="<? echo $linea['id']; ?>"></input>

		</form>
	
		<table class="commonlist" summary="Riepilogo dati parente" cellspacing="1" cellpadding="1" border='0'>
		
			<caption>Dati relativi al parente che si desidera cancellare:</caption>

			<tbody>
				<tr>
					<th scope='row'>id</th>
					<td><? echo $linea['id']; ?></td>
				</tr>
				<tr>
					<th scope='row'>Username</th>
					<td><? echo $linea['username']; ?></td>
				</tr>
				<tr>
					<th scope='row'>Password</th>
					<td><? echo $linea['password']; ?></td>
				</tr>
				<tr>
					<th scope='row'>Nome</th>
					<td><? echo $linea['name']; ?></td>
				</tr>
				<tr>
					<th scope='row'>Cognome</th>
					<td><? echo $linea['surname']; ?></td>
				</tr>
								
			</tbody>

		</table>
		
	</div>
	
</div>

<? include ('footer.php'); ?>

</body>

</html>