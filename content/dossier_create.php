<?
$pagename = 'dossier_create';
include ('config.php');
include ('ajax_init.php');

if (!isset($_SESSION["dossier_creation"]) || (!$_SESSION["dossier_creation"])) {
	$url = 'main.php';
	header('Location: ' . $url);	
}
include ('header.php');
?>

<body>

<?	include ('menu.php'); ?>

<div id="container">

<? 
$operationarea = "	<input type='button' name='submit:mainform' id='submit:mainform' value='salva' />
					<input type='reset' name='reset:mainform' id='reset:mainform' value='reset' />
					<input type='button' name='cancel' id='cancel' value='&lt;- indietro' />";
include ('messagearea.php');

?>
	<div id="content">
	
		<div id="fieldsetcontainer" class="sjbjl_tabbed">
		
			<ul>
				<li><a href="#tabs-1">Dossier</a></li>
			</ul>

			<form name="mainform" id="mainform" action="#" method="post" class="sjbjl_form">
			<input type="hidden" name="pagename" id="pagename" value="<? echo $pagename; ?>"></input>
			
			<fieldset>
			
			<h4 class="spacer"><span>Data ricovero e dimissione</span></h4>
			
			<div class="duenorma">
			
					<label for="admission_date" class="uno">Ricoverato il:</label>
					<input type="text" name="admission_date" id="admission_date"  class="due" value="<? echo $linea['admission_date']; ?>" onkeypress="sjbjl_checkfield(this,event,'mandatory=true,valuetype=date,label=Data Ricovero');"></input>
			
					<label for="discharge_date" class="tre">Dimesso il:</label>
					<input type="text" name="discharge_date" id="discharge_date"  class="quattro" value="<? echo $linea['discharge_date']; ?>" onkeypress="sjbjl_checkfield(this,event,'mandatory=false,valuetype=date,label=Data Dimissione');"></input>
			
				</div>
			
			<h4 class="spacer"><span>Paziente</span></h4>

				<div class="duenorma">
		
					<label for="ticket_patient" class="uno">Anagrafica:</label>
					<select class="due" name="ticket_patient" id="ticket_patient">
						<option value="">--</option>
					<?
						$query_ticket = "SELECT id,name,surname,ticket FROM users WHERE medical_id = '" . $_SESSION['id'] . "';";
						$result_ticket = mysql_query($query_ticket) or $esito = mysql_error();
						while ($linea_ticket = mysql_fetch_array($result_ticket, MYSQL_ASSOC)) {
							echo "<option value='" . $linea_ticket['ticket'] . "'>" . $linea_ticket['surname'] . " " . $linea_ticket['name'] . "</option>\r\n";
						}
					?>
					</select>
					<input type="hidden" name="ticket_patient_selected" id="ticket_patient_selected" value="<? echo $linea['ticket_patient']; ?>"></input>
				</div>

				<h4 class="spacer"><span>Dettagli Malattia</span></h4>
				
				<div class="duenorma">
					<label for="symptoms" class="uno">Sintomi:</label>
					<input type="text" name="symptoms" id="symptoms"  class="due" value="<? echo $linea['symptoms']; ?>" onkeypress="sjbjl_checkfield(this,event,'maxl=100,mandatory=true,valuetype=alphanumeric_blank,label=Sintomi');"></input>

					<label for="disease" class="tre">Malattia:</label>
					<input type="text" name="disease" id="disease" class="quattro" value="<? echo $linea['disease']; ?>" onkeypress="sjbjl_checkfield(this,event,'maxl=300,mandatory=true,valuetype=alphanumeric_blank,label=Malattia');"></input>
				
				</div>
				
				<div class="duenorma">
					<label for="temperature" class="uno">Temperatura:</label>
					<input type="text" name="temperature" id="temperature"  class="due" value="<? echo $linea['temperature']; ?>" onkeypress="sjbjl_checkfield(this,event,'mandatory=true,valuetype=numeric,label=Temperatura corporea');"></input>

					<label for="cure" class="tre">Cura:</label>
					<input type="text" name="cure" id="cure" class="quattro" value="<? echo $linea['cure']; ?>" onkeypress="sjbjl_checkfield(this,event,'maxl=250,mandatory=true,valuetype=alphanumeric_blank,label=Cura');"></input>
				</div>
				
											
				<input type="hidden" name="id" id="id" value="<? echo $_GET['id']; ?>"></input>

			</fieldset>
			
			</form>

		</div>

	</div>

</div>

<? include ('footer.php'); ?>

</body>

</html>