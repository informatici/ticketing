<?
@session_start();
@header("Cache-control: private");
@header('Content-Type: text/html; charset=iso-8859-1'); 
include ('config.php');
$_SESSION['gotopagemessage'] = '';


switch (utf8_decode($_POST['pagename'])) {

	case 'index':
	$query = "SELECT * FROM users WHERE (username = '" . utf8_decode($_POST['username']) . "') AND (password = '" . utf8_decode($_POST['password']) . "');";
	break;

	case 'main':
	break;

	case 'user_create':
	$user_creation_abil = 1;
	$medical_creation_abil = 1;
	$relative_creation_abil = 1;
	$patient_creation_abil = 1;
	$dossier_creation_abil = 1;
	$esiste = false;
	$query = "SELECT * FROM users WHERE (name='" . utf8_decode($_POST['name']) . "') AND (surname='" . utf8_decode($_POST['surname']) . "') AND user_type = 'administrator';";
	break;
	
	case 'medical_create':
	$patient_creation_abil = 1;
	$dossier_creation_abil = 1;
	$esiste = false;
	$query = "SELECT * FROM users WHERE (name='" . utf8_decode($_POST['name']) . "') AND (surname='" . utf8_decode($_POST['surname']) . "') AND user_type = 'medical';";
	break;
	
	case 'patient_create':
	$relative_creation_abil = 1;
	$esiste = false;
	$query = "SELECT * FROM users WHERE (name='" . utf8_decode($_POST['name'])  . "') AND (surname='" . utf8_decode($_POST['surname']) . "') AND user_type = 'patient';";
	break;
	
	case 'relative_create':
	$esiste = false;
	$query = "SELECT * FROM users WHERE (name='" . utf8_decode($_POST['name']) . "') AND (surname='" . utf8_decode($_POST['surname']) . "') AND user_type = 'relative';";
	break;

	case 'dossier_create':
	$esiste = false;
	$query = "SELECT * FROM dossier WHERE id='" . utf8_decode($_POST['id']) . "';";
	break;
	
	//EDIT	
	
	case 'user_edit':
	$query = "UPDATE users SET 
	username = '" . utf8_decode($_POST['username']) . "',
	name = '" . utf8_decode($_POST['name']) . "',
	WHERE id = '" . utf8_decode($_POST['id']) . "';";
	break;
	
	case 'medical_edit':
	$query = "UPDATE users SET 
	username = '" . utf8_decode($_POST['username']) . "',
	name = '" . utf8_decode($_POST['name']) . "',
	surname = '" . utf8_decode($_POST['surname']) . "',
	specialization = '" . utf8_decode($_POST['specialization']) . "',
	email = '" . utf8_decode($_POST['email']) . "'
	WHERE id = '" . utf8_decode($_POST['id']) . "';";
	break;
	
	case 'patient_edit':

	$query = "UPDATE users SET
		username = '" . utf8_decode($_POST['username']) . "',
		name = '". utf8_decode($_POST['name']) . "',
		surname = '". utf8_decode($_POST['surname']) . "',
		birth_date = '". utf8_decode($_POST['birth_date']) . "',
		gender = '". utf8_decode($_POST['gender']) . "'
		WHERE id = '" . utf8_decode($_POST['id']) . "';";
	break;

	case 'relative_edit':

	$query = "UPDATE users SET 
		username = '" . utf8_decode($_POST['username']) . "',
		name = '" . utf8_decode($_POST['name']) . "',
		surname = '" . utf8_decode($_POST['surname']) . "'
		WHERE id = '" . utf8_decode($_POST['id']) . "';";
	break;
	
	case 'dossier_edit':
	$query = "UPDATE dossier SET
		disease = '". utf8_decode($_POST['disease']) . "',
		symptoms = '". utf8_decode($_POST['symptoms']) . "',
		temperature = '". utf8_decode($_POST['temperature']) . "',
		cure = '". utf8_decode($_POST['cure']) . "',
		ticket_patient = '". utf8_decode($_POST['ticket_patient']) . "',
		admission_date = '". utf8_decode($_POST['admission_date']) . "',
		discharge_date = '". utf8_decode($_POST['discharge_date']) . "' 
		WHERE id = '" . utf8_decode($_POST['id']) . "';";
	break;
	
	
	// LISTING
	
	case 'users':
	$query = $_SESSION['gotopagequery'];
	break;
	
	case 'medical':
	$query = $_SESSION['gotopagequery'];
	break;
	
	case 'patients':
	$query = $_SESSION['gotopagequery'];
	break;
	
	case 'relative':
	$query = $_SESSION['gotopagequery'];
	break;
	
	case 'dossier':
	$query = $_SESSION['gotopagequery'];
	break;
	
	// DELETING
	
	case 'user_delete':
	$query = "DELETE from users WHERE id = ". utf8_decode($_POST['id']) ." AND removable = '1';" ;
	break;
	
	case 'medical_delete':
	$query = "DELETE from users WHERE id = ". utf8_decode($_POST['id']) ." AND removable = '1';" ;
	break;
	
	case 'patient_delete':
	$query = "DELETE from users WHERE id = ". utf8_decode($_POST['id']) ." " ;
	break;
	
	case 'relative_delete':
	$query = "DELETE from users WHERE id = ". utf8_decode($_POST['id']) ." AND removable = '1';" ;
	break;
	
	case 'dossier_delete':
	$query = "DELETE from dossier WHERE id = ". utf8_decode($_POST['id']) ." " ;
	break;
	
	default:
	break;

}

// ESECUZIONE QUERY

if (isset($query) && $query != '') {
	$result = mysql_query($query) or $esito = mysql_error();
}

switch (utf8_decode($_POST['pagename'])) {

	case 'index':
	$linea = mysql_fetch_array($result, MYSQL_ASSOC);
	if(mysql_num_rows($result) != 0){
		$_SESSION["id"] = $linea['id'];
		$_SESSION["username"] = $linea['username'];
		$_SESSION["user_type"] = $linea['user_type'];
		
		$_SESSION["name"] = $linea['name'];
		$_SESSION["surname"] = $linea['surname'];
		$_SESSION["ticket"] = $linea['ticket'];
		$_SESSION["medical_id"] = $linea['medical_id'];
		$_SESSION["patient_id"] = $linea['patient_id'];
		
		if ($linea['user_creation'] == '1') {
			$_SESSION["user_creation"] = true;	
		} else {
			$_SESSION["user_creation"] = false;
		}
		
		if ($linea['medical_creation'] == '1') {
			$_SESSION["medical_creation"] = true;	
		} else {
			$_SESSION["medical_creation"] = false;
		}
		
		if ($linea['patient_creation'] == '1') {
			$_SESSION["patient_creation"] = true;
		} else {
			$_SESSION["patient_creation"] = false;
		}
		
		if ($linea['relative_creation'] == '1') {
			$_SESSION["relative_creation"] = true;
		} else {
			$_SESSION["relative_creation"] = false;
		}
		
		if ($linea['dossier_creation'] == '1') {
			$_SESSION["dossier_creation"] = true;
		} else {
			$_SESSION["dossier_creation"] = false;
		}

		$gotopage = 'main.php';
		$message = '';
	} else {
		$_SESSION = array();
		if (isset($_COOKIE[session_name()])) {
			@setcookie(session_name(), '', time()-42000, '/');
			@session_destroy();
		}
		$gotopage = '';
		$message = 'Credenziali errate!!!';
	}
	break;

	case 'main':
	break;
	
	case 'user_create':
	while ($linea = mysql_fetch_array($result, MYSQL_ASSOC)) {
		if ((stripslashes($linea['username']) == utf8_decode($_POST['username'])) && (stripslashes($linea['password']) == utf8_decode($_POST['password']))) {
			$esiste = true;
			break;
		}
	}

	if ($esiste) {

		$gotopage = '';
		$message = 'Amministratore gi&agrave; esistente!';

	} else {
	
				
		$query = "INSERT INTO users (
			username,
			password,
			user_type,
			user_creation,
			medical_creation,
			patient_creation,
			relative_creation,
			dossier_creation
			) VALUES (
			'" . utf8_decode($_POST['username']) . "',
			'" . utf8_decode($_POST['password']) . "',
			'administrator',
			'" . utf8_decode($_POST['user_creation']) . "',
			'" . utf8_decode($_POST['medical_creation']) . "',
			'" . utf8_decode($_POST['patient_creation']) . "',
			'" . utf8_decode($_POST['relative_creation']) . "',
			'" . utf8_decode($_POST['dossier_creation']) . "'
			);";
			
	
		$result = mysql_query($query) or $esito = mysql_error();
		$gotopage = 'users.php';
		$message = '';
		$_SESSION['gotopagemessage'] = 'Amministratore inserito con successo!';
		
	}
	break;
	

	
	case 'medical_create':
	while ($linea = mysql_fetch_array($result, MYSQL_ASSOC)) {
		if ((stripslashes($linea['username']) == utf8_decode($_POST['username'])) && (stripslashes($linea['password']) == utf8_decode($_POST['password']))) {
			$esiste = true;
			break;
		}
	}

	if ($esiste) {

		$gotopage = '';
		$message = 'Medico gi&agrave; esistente!';

	} else {
	
				
		$query = "INSERT INTO users (
			username,
			password,
			name,
			surname,
			specialization,
			email,
			user_type,
			patient_creation,
			dossier_creation
			) VALUES (
			'" . utf8_decode($_POST['username']) . "',
			'" . utf8_decode($_POST['password']) . "',
			'" . utf8_decode($_POST['name']) . "',
			'" . utf8_decode($_POST['surname']) . "',
			'" . utf8_decode($_POST['specialization']) . "',
			'" . utf8_decode($_POST['email']) . "',
			'medical',
			'1',
			'1'
			);";
			
	
		$result = mysql_query($query) or $esito = mysql_error();
		$gotopage = 'medical.php';
		$message = '';
		$_SESSION['gotopagemessage'] = 'Medico inserito con successo!';
	
	}
	break;
	
	
	case 'patient_create':
		while ($linea = mysql_fetch_array($result, MYSQL_ASSOC)) {
			if ((stripslashes($linea['username']) == utf8_decode($_POST['username'])) &&
			(stripslashes($linea['password']) == utf8_decode($_POST['password']))
			) {
				$esiste = true;
				break;
			}
		}
	
	if ($esiste) {
		$gotopage = '';
		$message = 'Paziente gi&agrave; esistente!';
	} else {
			
		$ticket = uniqid();
			$query = "INSERT INTO users (
			username,
			password,
			name,
			surname,
			birth_date,
			gender,
			ticket,
			user_type,
			medical_id,
			relative_creation
			) VALUES (
			'". utf8_decode($_POST['username']) . "',
			'". utf8_decode($_POST['password']) . "',
			'". utf8_decode($_POST['name']) . "',
			'". utf8_decode($_POST['surname']) . "',
			'". utf8_decode($_POST['birth_date']) . "',
			'". utf8_decode($_POST['gender']) . "',
			'" . $ticket . "',
			'patient',
			'" . $_SESSION["id"] . "',
			'1'
			);";
			
		$result = mysql_query($query) or $esito = mysql_error();	
			
		$gotopage = 'patients.php';
		$message = '';
		$_SESSION['gotopagemessage'] = "Paziente inserito con successo!";
	}
	break;

	case 'relative_create' :
	while ($linea = mysql_fetch_array($result, MYSQL_ASSOC)) {
		if ((stripslashes($linea['username']) == utf8_decode($_POST['username'])) && (stripslashes($linea['passowrd']) == utf8_decode($_POST['password']))) {
			$esiste = true;
			break;
		}
	}

	if ($esiste) {

		$gotopage = '';
		$message = 'Parente gi&agrave; esistente!';
	
	} else {
		
		$query = "INSERT INTO users (
			name,
			surname,
			ticket,
			username,
			password,
			patient_id,
			user_type
			) VALUES (
			'" . utf8_decode($_POST['name']) . "',
			'" . utf8_decode($_POST['surname']) . "',
			'" . utf8_decode($_SESSION['ticket']) . "',
			'" . utf8_decode($_POST['username']) . "',
			'" . utf8_decode($_POST['password']) . "',
			'" . $_SESSION["id"] . "',
			'relative'
			);";

		$result = mysql_query($query) or $esito = mysql_error();
		$gotopage = 'relative.php';
		$message = '';
		$_SESSION['gotopagemessage'] = 'Parente inserito con successo!';
	}
	break;
	
	case 'dossier_create': 
		while ($linea = mysql_fetch_array($result, MYSQL_ASSOC)) {
		if (stripslashes($linea['id']) == utf8_decode($_POST['id'])) {
			$esiste = true;
			break;
			}
		}
	
	if ($esiste) {
		$gotopage = '';
		$message = 'Dossier gi&agrave; esistente!';
	}
	else {
	
	// aggiungere generazione pseudocasuale del ticket
		$query = "INSERT INTO dossier (
		ticket_patient, 
		disease,
		symptoms,
		temperature,
		cure,
		admission_date,
		discharge_date,
		medical_id
		) VALUES (
		'". utf8_decode($_POST['ticket_patient']) . "',
		'". utf8_decode($_POST['disease']) . "',
		'". utf8_decode($_POST['symptoms']) . "',
		'". utf8_decode($_POST['temperature']) . "',
		'". utf8_decode($_POST['cure']) . "',
		'". utf8_decode($_POST['admission_date']) . "',
		'". utf8_decode($_POST['discharge_date']) . "',
		'". $_SESSION["id"] . "'
			);";

		$result = mysql_query($query) or $esito = mysql_error();	
		
	$gotopage = 'dossier.php';
	$message = '';
	$_SESSION['gotopagemessage'] = "Dossier inserito con successo!";
	}
	break;
	
	
	// EDITING
	
	case 'user_edit':
	$gotopage = 'users.php';
	$message = '';
	$_SESSION['gotopagemessage'] = 'Amministratore modificato correttamente!';
	break;
	
	case 'medical_edit':
	$gotopage = 'medical.php';
	$message = '';
	$_SESSION['gotopagemessage'] = 'Medico modificato correttamente!';
	break;
	
	case 'patient_edit':
	$gotopage = 'patients.php';
	$message = '';
	$_SESSION['gotopagemessage'] = "Paziente modificato con successo!";
	break;
	
	case 'relative_edit':
	$gotopage = 'relative.php';
	$message = '';
	$_SESSION['gotopagemessage'] = 'Paziente modificato correttamente!';
	break;
	
	case 'dossier_edit':
	$gotopage = 'dossier.php';
	$message = '';
	$_SESSION['gotopagemessage'] = "Dossier modificato con successo!";
	break;
	
	// LISTING

	case 'users':
	$linea = mysql_fetch_array($result, MYSQL_ASSOC);
	break;
	
	case 'medical':
	$linea = mysql_fetch_array($result, MYSQL_ASSOC);
	break;

	case 'patients':
	$linea = mysql_fetch_array($result, MYSQL_ASSOC);
	break;
	
	case 'relative':
	$linea = mysql_fetch_array($result, MYSQL_ASSOC);
	break;
	
	case 'dossier':
	$linea = mysql_fetch_array($result, MYSQL_ASSOC);
	break;
	
	// DELETION
	
	case 'user_delete':
	$gotopage = 'users.php';
	$message = '';
	$_SESSION['gotopagemessage'] = 'Amministratore cancellato con successo!';
	break;
	
	case 'medical_delete':
	$gotopage = 'medical.php';
	$message = '';
	$_SESSION['gotopagemessage'] = 'Medico cancellato con successo!';
	break;
	
	case 'patient_delete':
	$gotopage = 'patients.php';
	$message = '';
	$_SESSION['gotopagemessage'] = 'Paziente cancellato con successo!';
	break;
	
	case 'relative_delete':
	$gotopage = 'relative.php';
	$message = '';
	$_SESSION['gotopagemessage'] = 'Parente cancellato con successo!';
	break;
	
	case 'dossier_delete':
	$gotopage = 'dossier.php';
	$message = '';
	$_SESSION['gotopagemessage'] = 'Dossier cancellato con successo!';
	break;
	
	default:
	break;

}

$return_value = "{gotopage: '" . $gotopage .  "',message: '" . $message . "'}";

header('Content-Type: text/html');
echo $return_value;

?>