<?
if (!isset($pagetype)) {
	@session_start();
	@header("Cache-control: private");
}

if (isset($_GET['pagename']) && ($_GET['pagename'] != '')) {
	$pagename = $_GET['pagename'];
}
switch ($pagename) {

	case 'index':
	if (isset($_GET['result']) && ($_GET['result'] == "logout")) {
		$_SESSION = array();
		if (isset($_COOKIE[session_name()])) {
		   setcookie(session_name(), '', time()-42000, '/');
		}
		session_destroy();
		$url = 'index.php';
		header('Location: ' . $url);
	}
	break;

	case 'main':
	$menusezione = 'ADT';
	$menufunzione = 'Homepage';	
	break;
	

	// CREATION	
	
	case 'user_create':
	$menusezione = 'Amministratori';
	$menufunzione = 'Nuovo Amministratore';
	$user_creation_abil = "checked='checked'";
	$medical_creation_abil = "checked='checked'";
	$relative_creation_abil = "checked='checked'";
	$patient_creation_abil = "checked='checked'";
	$dossier_creation_abil = "checked='checked'";
	
	break;
	
	case 'medical_create':
	$menusezione = 'Medici';
	$menufunzione = 'Nuovo Medico';
	$patient_creation_abil = "checked='checked'";
	$dossier_creation_abil = "checked='checked'";
	
	break;
	
	case 'patient_create':
	$menusezione = 'Pazienti';
	$menufunzione = 'Nuovo Paziente';
	$relative_creation_abil = "checked='checked";	
	break;
	
	case 'relative_create':
	$menusezione = 'Parenti';
	$menufunzione = 'Nuovo Parente';
	break;

	case 'dossier_create':
	$menusezione = 'Dossier';
	$menufunzione = 'Nuovo Dossier';
	break;
	
	// EDITING
	
	case 'user_edit':
	$menusezione = 'Amministratori';
	$menufunzione = 'Modifica Amministratore';
	$query = "SELECT * FROM users WHERE id = '" . $_GET['id'] . "' AND removable = '0';";
	$risultato = mysql_query($query) or die("Query fallita: " . mysql_error());
	$linea = mysql_fetch_array($risultato, MYSQL_ASSOC);
	mysql_free_result($risultato);
	break;
	
	case 'medical_edit':
	$menusezione = 'Medici';
	$menufunzione = 'Modifica Medico';
	$query = "SELECT * FROM users WHERE id = '" . $_GET['id'] . "' AND removable = '1';";
	$risultato = mysql_query($query) or die("Query fallita: " . mysql_error());
	$linea = mysql_fetch_array($risultato, MYSQL_ASSOC);
	mysql_free_result($risultato);
	break;

	case 'patient_edit':
	$menusezione = 'Pazienti';
	$menufunzione = 'Modifica Paziente';
	$query = "SELECT * FROM users WHERE id = '" . $_GET['id'] . "';";
	$risultato = mysql_query($query) or die("Query fallita: " . mysql_error());
	$linea = mysql_fetch_array($risultato, MYSQL_ASSOC);
	mysql_free_result($risultato);
	break;	
	
	case 'relative_edit':
	$menusezione = 'Parenti';
	$menufunzione = 'Modifica Parente';
	$query = "SELECT * FROM users WHERE id = '" . $_GET['id'] . "' AND removable = '1';";
	$risultato = mysql_query($query) or die("Query fallita: " . mysql_error());
	$linea = mysql_fetch_array($risultato, MYSQL_ASSOC);
	mysql_free_result($risultato);
	break;
	
	case 'dossier_edit':
	$menusezione = 'Dossier';
	$menufunzione = 'Modifica Dossier';
	$query = "SELECT * FROM dossier WHERE id = '" . $_GET['id'] . "';";
	$risultato = mysql_query($query) or die("Query fallita: " . mysql_error());
	$linea = mysql_fetch_array($risultato, MYSQL_ASSOC);
	mysql_free_result($risultato);
	break;	
	
	// LISTING
	
case 'user':
$menusezione = 'Amministratori';
$menufunzione = 'Lista amministartori';
$query = "SELECT * FROM users WHERE removable = '0' AND user_type='administrator';";
$risultato = mysql_query($query) or die("Query fallita: " . mysql_error());
break;
	
case 'medical':
	
switch($_SESSION["user_type"]) {
	
	case 'medical':
	$menusezione = 'Medici';
	$menufunzione = 'Lista medici';
	$query = "SELECT * FROM users WHERE removable = '1' AND user_type='medical';";
	$risultato = mysql_query($query) or die("Query fallita: " . mysql_error());
	break;
	
	case 'patient':
	$menusezione = 'Medici';
	$menufunzione = 'Medico Associato';
	$query = "SELECT * FROM users WHERE removable = '1' AND user_type = 'medical' AND id = '" . $_SESSION["medical_id"] . "';";
	$risultato = mysql_query($query) or die("Query fallita: " . mysql_error());
	break;
	
	case 'administrator':
	$menusezione='Medici';
	$menufunzione='Elenco Medici';
	$query="SELECT * FROM users WHERE removable='1' AND user_type='medical';";
	$risultato = mysql_query($query) or die("Query fallita: " . mysql_error());
	break;
	
	case 'relative':
	$menusezione = 'Medici';
	$menufunzione = 'Medico Associato';
	$query = "SELECT * FROM medial WHERE id = (SELECT medical_id FROM users WHERE removable = '1' AND user_type = 'medical' AND id = '" . $_SESSION["patient_id"] . "');";
	$risultato = mysql_query($query) or die("Query fallita: " . mysql_error());
	break;

	default:
	break;
}
break;	
	
case 'patients':
	
$usertypeQuery = "SELECT user_type FROM users WHERE id='" . $_SESSION["id"] . "';";
$usertypeRisultato = mysql_query($usertypeQuery) or die("Query fallita: " . mysql_error());
$usertypeLine = mysql_fetch_array($usertypeRisultato, MYSQL_ASSOC);
	
$usertype = $usertypeLine['user_type'];
	
switch($usertype) {

	case'medical':
	$menusezione = 'Pazienti';
	$menufunzione = 'Lista Pazienti';
	$query = "SELECT * FROM users  WHERE removable = '1' AND medical_id=(select id from users where id='" . $_SESSION["id"] . "');";
	$risultato = mysql_query($query) or die("Query fallita: " . mysql_error());
	break;
	
	case'relative':
	$menusezione = 'Pazienti';
	$menufunzione = 'Mio Famigliare';
	$query = "SELECT * FROM users  WHERE removable = '1' AND id=(select patient_id from users where id='" . $_SESSION["id"] . "');";
	$risultato = mysql_query($query) or die("Query fallita: " . mysql_error());
	break;
	
	case'patient':
	$menusezione = 'Pazienti';
	$menufunzione = 'Me Stesso';
	$query = "SELECT * FROM users  WHERE removable = '1' AND id='" . $_SESSION["id"] . "';";
	$risultato = mysql_query($query) or die("Query fallita: " . mysql_error());	
	break;
	
	case'administrator':
	$menusezione = 'Pazienti';
	$menufunzione = 'Lista Pazienti';
	$query = "SELECT * FROM users WHERE removable = '1' AND user_type='patient';";
	$risultato = mysql_query($query) or die("Query fallita: " . mysql_error());
	break;
	
	default:
	break;
}

break;	
	
case 'relative':
	
$usertypeQuery = "SELECT user_type FROM users WHERE id='" . $_SESSION["id"] . "';";
$usertypeRisultato = mysql_query($usertypeQuery) or die("Query fallita: " . mysql_error());
$usertypeLine = mysql_fetch_array($usertypeRisultato, MYSQL_ASSOC);
	
$usertype = $usertypeLine['user_type'];

switch($usertype) {

	case'administrator':
	$menusezione = 'Parenti';
	$menufunzione = 'Lista Parenti';
	$query = "SELECT * FROM users WHERE removable = '1' AND user_type='relative';";
	$risultato = mysql_query($query) or die("Query fallita: " . mysql_error());
	break;
	
	case'relative':
	$menusezione = 'Parenti';
	$menufunzione = 'Scheda Personale';
	$query = "SELECT * FROM users WHERE removable = '1' AND id='" . $_SESSION["id"] ."';";
	$risultato = mysql_query($query) or die("Query fallita: " . mysql_error());
	break;
	
	case'medical':
	$url ='main.php';
	header('Location:' . $url);
	break;
	
	case'patient':
	$menusezione = 'Parenti';
	$menufunzione = 'Mio Parente';
	$query = "SELECT * FROM users WHERE removable = '1' AND patient_id='" . $_SESSION["id"] ."';";
	$risultato = mysql_query($query) or die("Query fallita: " . mysql_error());
	break;
	
	default:
	break;
}

break;

case 'dossier':

switch($_SESSION['user_type']) {

	case'administrator';
	$menusezione = 'Dossier';
	$menufunzione = 'Lista Dossier';
	$query = "SELECT dossier.*,users.name AS name,users.surname AS surname FROM users INNER JOIN dossier ON users.ticket = dossier.ticket_patient WHERE users.user_type = 'patient' ORDER BY surname;";
	$risultato = mysql_query($query) or die("Query fallita: " . mysql_error());
	break;
	
	case'medical':
	$menusezione = 'Dossier';
	$menufunzione = 'Lista Dossier';
	$query = "SELECT dossier.*,users.name AS name,users.surname AS surname FROM users,dossier WHERE dossier.ticket_patient = users.ticket AND dossier.medical_id= '" . $_SESSION["id"] . "';";
	$risultato = mysql_query($query) or die("Query fallita: " . mysql_error());
	break;
	
	case'patient':
	$menusezione = 'Dossier';
	$menufunzione = 'Dossier Personale';
	$query = "SELECT * FROM dossier WHERE ticket_patient=(SELECT ticket FROM users WHERE id='" . $_SESSION["id"] . "');";
	$risultato = mysql_query($query) or die("Query fallita: " . mysql_error());
	break;
	
	case'relative':
	$menusezione = 'Dossier';
	$menufunzione = 'Dossier del famigliare';
	$query = "SELECT * FROM dossier WHERE ticket_patient = '" . $_SESSION['ticket'] . "';";
	$risultato = mysql_query($query) or die("Query fallita: " . mysql_error());																
	break;
	
	default:
	break;
}

break;
	// DELETION
	
	case 'user_delete':
	$menusezione = 'Amministratori';
	$menufunzione = 'Cancella Amministratore';
	$query = "SELECT * FROM users WHERE id = '" . $_GET['id'] . "'";
	$risultato = mysql_query($query) or die("Query fallita: " . mysql_error());
	$linea = mysql_fetch_array($risultato, MYSQL_ASSOC);
	mysql_free_result($risultato);
	break;
	
	case 'medical_delete':
	$menusezione = 'Medici';
	$menufunzione = 'Cancella Medico';
	$query = "SELECT * FROM users WHERE id = '" . $_GET['id'] . "'";
	$risultato = mysql_query($query) or die("Query fallita: " . mysql_error());
	$linea = mysql_fetch_array($risultato, MYSQL_ASSOC);
	mysql_free_result($risultato);
	break;
	
	case 'patient_delete':
	$menusezione = 'Pazienti';
	$menufunzione = 'Cancella Paziente';
	$query = "SELECT * FROM users WHERE id = '" . $_GET['id'] . "';";
	$risultato = mysql_query($query) or die("Query fallita: " . mysql_error());
	$linea = mysql_fetch_array($risultato, MYSQL_ASSOC);
	mysql_free_result($risultato);
	break;	
	
	case 'relative_delete':
	$menusezione = 'Parenti';
	$menufunzione = 'Cancella Parente';
	$query = "SELECT * FROM users WHERE id = '" . $_GET['id'] . "'";
	$risultato = mysql_query($query) or die("Query fallita: " . mysql_error());
	$linea = mysql_fetch_array($risultato, MYSQL_ASSOC);
	mysql_free_result($risultato);
	break;
	
	case 'dossier_delete':
	$menusezione = 'Dossier';
	$menufunzione = 'Cancella Dossier';
	$query = "SELECT * FROM dossier WHERE id = '" . $_GET['id'] . "';";
	$risultato = mysql_query($query) or die("Query fallita: " . mysql_error());
	$linea = mysql_fetch_array($risultato, MYSQL_ASSOC);
	mysql_free_result($risultato);
	break;	
	
	case 'logout':
	$_SESSION = array();
	if (isset($_COOKIE[session_name()])) {
		setcookie(session_name(), '', time()-42000, '/');
	}
	session_destroy();
	break;
	
	default:
	break;

}

?>