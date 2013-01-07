<?
$pagename = 'user_delete';
include ('config.php');
include ('ajax_init.php');
if (!isset($_SESSION["user_creation"])) {
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
	
		<table class="commonlist" summary="Riepilogo dati utente" cellspacing="1" cellpadding="1" border='0'>
		
			<caption>Dati relativi all'utente che si desidera cancellare:</caption>

			<tbody>
				<tr>
					<th scope='row'>id</th>
					<td><? echo $linea['id']; ?></td>
				</tr>
				<tr>
					<th scope='row'>Tipo utente</th>
					<td><? echo $linea['user_type']; ?></td>
				</tr>
				<tr>
					<th scope='row'>Username</th>
					<td><? echo $linea['username']; ?></td>
				</tr>
				<tr>
					<th scope='row'>Gestione utenti</th>
					<td><? echo $linea['user_creation']; ?></td>
				</tr>
				<tr>
					<th scope='row'>Gestione medici</th>
					<td><? echo $linea['medical_creation']; ?></td>
				</tr>
				<tr>
					<th scope='row'>Gestione parenti</th>
					<td><? echo $linea['patient_creation']; ?></td>
				</tr>
				<tr>
					<th scope='row'>Gestione pazienti</th>
					<td><? echo $linea['relative_creation']; ?></td>
				</tr>
				<tr>
					<th scope='row'>Gestione dossier</th>
					<td><? echo $linea['dossier_creation']; ?></td>
				</tr>
				
			</tbody>

		</table>
		
	</div>
	
</div>

<? include ('footer.php'); ?>

</body>

</html>