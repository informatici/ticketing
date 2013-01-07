<?
$pagename = 'users';
include ('config.php');
include ('ajax_init.php');
include ('header.php');
?>

<body>

<?	include ('menu.php'); ?>

<div id="container">

<? 
$operationarea = "	
<input type='button' name='print' id='print' value='stampa' />
<input type='button' name='cancel' id='cancel' value='&lt;- indietro' />
";

include ('messagearea.php');
?>

<? echo $_SESSION['gotopagemessage']; ?>

	<div id="content">
	
		<table class="commonlist" summary="Lista degli utenti" cellspacing="0" cellpadding="0" border='0'>
		
			<caption>Lista Utenti</caption>

			<thead>
				<tr>
					<th scope='col'>id</th>
					<th scope='col'>Tipo utente</th>
					<th scope='col'>Username</th>
					<th scope='col'>Gestione utenti</th>
					<th scope='col'>Gestione medici</th>
					<th scope='col'>Gestione pazienti</th>
					<th scope='col'>Gestione parenti</th>
					<th scope='col'>Gestione dossier</th>
					<?
						if($_SESSION["user_creation"]){
							print "
							<th colspan='2' class='th_operation2'>Operazioni</th>
							";
						}
					?>
				</tr>
			</thead>

			<tbody>

			<? 

			$i = 0;

			while ($linea = mysql_fetch_array($risultato, MYSQL_ASSOC)) {

				print "
				<tr>
					<th scope='row'>" . $linea['id'] . "</th>
					<td>" . $linea['user_type'] . "</td>
					<td>" . $linea['username'] . "</td>
					<td>" . $linea['user_creation'] . "</td>
					<td>" . $linea['medical_creation'] . "</td>
					<td>" . $linea['patient_creation'] . "</td>
					<td>" . $linea['relative_creation'] . "</td>
					<td>" . $linea['dossier_creation'] . "</td>
						";
						if ($_SESSION["user_creation"]) {
							print "
							<td><a href='user_create.php?pagename=user_edit&amp;id=" . stripslashes($linea['id']) . "' class='icon_edit' title='Modifica questo utente'><span>modifica</span></a></td>
							<td><a href='user_delete.php?id=" . stripslashes($linea['id']) . "' class='icon_delete' title='Cancella questo utente'><span>cancella</span></a></td>
							";
						}
				print "
				</tr>
				";

			}

			?>

			</tbody>

		</table>
		
	</div>
	
</div>

<? include ('footer.php'); ?>

</body>

</html>