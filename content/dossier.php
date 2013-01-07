<?
@session_start();
@header("Cache-control: private");
@header('Content-Type: text/html; charset=iso-8859-1'); 
$pagename = 'dossier';
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
	
		<table class="commonlist" summary="Lista dei pazienti" cellspacing="0" cellpadding="0" border='0'>
		
			<caption>Lista Dossier</caption>

			<thead>
				<tr>
					<th scope='col'>id</th>
					<th scope='col'>Data Ricovero</th>
					<th scope='col'>Data Rilascio</th>
					<th scope='col'>Paziente</th>
					<th scope='col'>Ticket del paziente</th>
					<th scope='col'>Temperatura</th>
					<th scope='col'>Malattia</th>
					<th scope='col'>Cura</th>
					<?
						if ($_SESSION["dossier_creation"]) {
							print "<th colspan='3'>Operazioni</th>";
						} else {
							print "<th>Operazioni</th>";
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
					<td>" . $linea['admission_date'] . "</td>
					<td>" . $linea['discharge_date'] . "</td>
					<td>" . $linea['surname'] . " " . $linea['name'] . "</td>
					<td>" . $linea['ticket_patient'] . "</td>
					<td>" . $linea['temperature'] . "</td>
					<td>" . $linea['disease'] . "</td>
					<td>" . $linea['cure'] . "</td>
					";
						if ($_SESSION["dossier_creation"]) {
							print "
							<td><a href='dossier_create.php?pagename=dossier_edit&amp;id=" . stripslashes($linea['id']) . "' class='icon_edit' title='Modifica questo dossier'><span>modifica</span></a></td>
							<td><a href='dossier_delete.php?id=" . stripslashes($linea['id']) . "' class='icon_delete' title='Cancella questo dossier'><span>cancella</span></a></td>
							"; 								
				        }

					print "
					<td><a href='./controllo_xml.php?ticket_patient=" . stripslashes($linea['ticket_patient']) . "&patient=" . stripslashes($linea['surname']) . " " . stripslashes($linea['name']) . "&username=" . $_SESSION['username'] . "' target='_blank' class='icon_webconf' title='Inizia una web conference'><span>web conference</span></a></td>
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