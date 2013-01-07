<?
$pagename = 'medical_create';
include ('config.php');
include ('ajax_init.php');

if (!isset($_SESSION["medical_creation"]) || (!$_SESSION["medical_creation"])) {
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
				<li><a href="#tabs-1">Medico</a></li>
			</ul>

			<form name="mainform" id="mainform" action="#" method="post" class="sjbjl_form">
			<input type="hidden" name="pagename" id="pagename" value="<? echo $pagename; ?>"></input>
			
			<fieldset>
			
				<h4 class="spacer"><span>Autenticazione</span></h4>
				
				<div class="duenorma">
			
					<label for="username" class="uno">Username:</label>
					<input type="text" name="username" id="username"  class="due" value="<? echo $linea['username']; ?>" onkeypress="sjbjl_checkfield(this,event,'maxl=24,mandatory=true,valuetype=username,label=username');"></input>

					<label for="password" class="tre">Password:</label>
					<input type="text" name="password" id="password" class="quattro" value="<? echo $linea['password']; ?>" onkeypress="sjbjl_checkfield(this,event,'minl=6,maxl=24,mandatory=true,valuetype=password,label=password');"></input>
					
				</div>
				
				<h4 class="spacer"><span>Dati personali</span></h4>
				
				<div class="duenorma">
			
					<label for="name" class="uno">Nome:</label>
					<input type="text" name="name" id="name"  class="due" value="<? echo $linea['name']; ?>" onkeypress="sjbjl_checkfield(this,event,'maxl=48,mandatory=true,valuetype=alphanumeric_blank,label=nome');"></input>
			
					<label for="surname" class="tre">Cognome:</label>
					<input type="text" name="surname" id="surname"  class="quattro" value="<? echo $linea['surname']; ?>" onkeypress="sjbjl_checkfield(this,event,'maxl=48,mandatory=true,valuetype=alphanumeric_blank,label=cognome');"></input>
			
				</div>
				
				<div class="duenorma">
			
					<label for="email" class="uno">e-mail:</label>
					<input type="text" name="email" id="email"  class="due" value="<? echo $linea['email']; ?>" onkeypress="sjbjl_checkfield(this,event,'maxl=64,mandatory=true,valuetype=email,label=e-mail');"></input>
				</div>

				<h4 class="spacer"><span>Specializzazione</span></h4>
				
				<div class="duenorma">
			
					<label for="specialization" class="uno">Specializzato:</label>
					<input type="text" name="specialization" id="specialization" class="due" value="<? echo $linea['specialization']; ?>" onkeypress="sjbjl_checkfield(this,event,'maxl=300,mandatory=true,valuetype=alphanumeric_blank,label=specializzato in');"></input>

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