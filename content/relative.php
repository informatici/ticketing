<?
$pagename = 'relative';
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
	
		<table class="commonlist" summary="Lista dei parenti" cellspacing="0" cellpadding="0" border='0'>
		
			<caption>Lista Parenti</caption>

			<thead>
				<tr>
					<th scope='col'>id</th>
					<th scope='col'>Username</th>
					<th scope='col'>Nome</th>
					<th scope='col'>Cognome</th>
					<?
						if ($_SESSION["relative_creation"]) {
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
					";
						if ($_SESSION["relative_creation"]) {
							print "
							<td><a href='relative_create.php?pagename=relative_edit&amp;id=" . stripslashes($linea['id']) . "' class='icon_edit' title='Modifica questo parente'><span>modifica</span></a></td>
							<td><a href='relative_delete.php?id=" . stripslashes($linea['id']) . "' class='icon_delete' title='Cancella questo parente'><span>cancella</span></a></td>
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