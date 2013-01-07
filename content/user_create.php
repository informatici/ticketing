<?
$pagename = 'user_create';
include ('config.php');
include ('ajax_init.php');

if (!isset($_SESSION["user_creation"]) || (!$_SESSION["user_creation"])) {
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
				<li><a href="#tabs-1">Dati Utente</a></li>
			</ul>

			<form name="mainform" id="mainform" action="#" method="post" class="sjbjl_form">
			<input type="hidden" name="pagename" id="pagename" value="<? echo $pagename; ?>"></input>
			
			<fieldset>

				<div class="duenorma">
			
					<label for="user_type" class="tre">Tipo utente:</label>
					<input type="text" name="user_type" id="user_type"  class="quattro" value="<? echo $linea['user_type']; ?>" onkeypress="sjbjl_checkfield(this,event,'mandatory=true,valuetype=alphanumeric_blank,label=tipo utente');"></input>
			
				</div>

				<h4 class="spacer"><span>Autenticazione</span></h4>
				
				<div class="duenorma">
			
					<label for="username" class="uno">Username:</label>
					<input type="text" name="username" id="username"  class="due" value="<? echo $linea['username']; ?>" onkeypress="sjbjl_checkfield(this,event,'maxl=24,mandatory=true,valuetype=username,label=username');"></input>

					<label for="password" class="tre">Password:</label>
					<input type="text" name="password" id="password" class="quattro" value="<? echo $linea['password']; ?>" onkeypress="sjbjl_checkfield(this,event,'minl=6,maxl=24,mandatory=true,valuetype=password,label=password');"></input>
					
				</div>
				
				<h4 class="spacer"><span>Abilitazioni</span></h4>
				
				<div class="dueabil">
					<input type="checkbox" name="user_creation_abil" id="user_creation_abil" class="uno" value="1" <? echo $user_creation_abil; ?> />
					<label for="user_creation_abil" class="due">Gestione utenti</label>
				
					<input type="checkbox" name="medical_creation_abil" id="medical_creation_abil" class="tre" value="1" <? echo $medical_creation_abil; ?> />
					<label for="medical_creation_abil" class="quattro">Gestione medici</label>
			
				</div>
				
				<div class="dueabil">
					<input type="checkbox" name="patient_creation_abil" id="patient_creation_abil" class="uno" value="1" <? echo $patient_creation_abil; ?> />
					<label for="patient_creation_abil" class="due">Gestione pazienti</label>
				
					<input type="checkbox" name="relative_creation_abil" id="relative_creation_abil" class="tre" value="1" <? echo $relative_creation_abil; ?> />
					<label for="relative_creation_abil" class="quattro">Gestione parenti</label>
					
				</div>
				
				<div class="dueabil">
					<input type="checkbox" name="dossier_creation_abil" id="dossier_creation_abil" class="uno" value="1" <? echo $dossier_creation_abil; ?> />
					<label for="dossier_creation_abil" class="due">Gestione dossier</label>
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