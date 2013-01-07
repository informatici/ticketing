<?
$pagename = 'medical';
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
	
		<table class="commonlist" summary="Lista dei medici" cellspacing="0" cellpadding="0" border='0'>
		
			<caption>Lista Medici</caption>

			<thead>
				<tr>
					<th scope='col'>id</th>
					<th scope='col'>Username</th>
					<th scope='col'>Nome</th>
					<th scope='col'>Cognome</th>
					<th scope='col'>Specializzato in</th>
					<th scope='col'>e-mail</th>
					<?
						if ($_SESSION["medical_creation"]) {
							print "
							<th colspan='2'>Operazioni</th>
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
					<td>" . $linea['username'] . "</td>
					<td>" . $linea['name'] . "</td>
					<td>" . $linea['surname'] . "</td>
					<td>" . $linea['specialization'] . "</td>
					<td><a href='mailto:". $linea['email'] . "' title='invia una mail' class='email'>" . $linea['email'] . "</a></td>
				
				";
						if ($_SESSION["medical_creation"]) {
							print "
							<td><a href='medical_create.php?pagename=medical_edit&amp;id=" . stripslashes($linea['id']) . "' class='icon_edit' title='Modifica questo medico'><span>modifica</span></a></td>
							<td><a href='medical_delete.php?id=" . stripslashes($linea['id']) . "' class='icon_delete' title='Cancella questo medico'><span>cancella</span></a></td>
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