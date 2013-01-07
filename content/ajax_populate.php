<?
include ('config.php');

switch ($_GET['param']) {

	case 'user_id':
	$query = "SELECT id,username FROM users";
	$result = mysql_query($query) or $esito = mysql_error();
	while ($linea = mysql_fetch_array($result, MYSQL_ASSOC)) {
		if (isset($_GET['selected']) && ($_GET['selected'] == $linea['id'])) {
			$selected = " selected='selected'";
		} else {
			$selected = '';
		}
		echo "<option value='" . $linea['id'] ."' " . $selected . ">" . $linea['username'] . "</option>\r\n";
	}
	break;
	
	case 'medical_id':
	$query = "SELECT id,username FROM users";
	$result = mysql_query($query) or $esito = mysql_error();
	while ($linea = mysql_fetch_array($result, MYSQL_ASSOC)) {
		if (isset($_GET['selected']) && ($_GET['selected'] == $linea['id'])) {
			$selected = " selected='selected'";
		} else {
			$selected = '';
		}
		echo "<option value='" . $linea['id'] ."' " . $selected . ">" . $linea['username'] . "</option>\r\n";
	}
	break;
	
	case 'patient_id':
	$query = "SELECT ticket,username FROM users";
	$result = mysql_query($query) or $esito = mysql_error();
	while ($linea = mysql_fetch_array($result, MYSQL_ASSOC)) {
		if (isset($_GET['selected']) && ($_GET['selected'] == $linea['ticket'])) {
			$selected = " selected='selected'";
		} else {
			$selected = '';
		}
		echo "<option value='" . $linea['ticket'] ."' " . $selected . ">" . $linea['username'] . "</option>\r\n";
	}
	break;
	
	case 'relative_id':
	$query = "SELECT id,username FROM users";
	$result = mysql_query($query) or $esito = mysql_error();
	while ($linea = mysql_fetch_array($result, MYSQL_ASSOC)) {
		if (isset($_GET['selected']) && ($_GET['selected'] == $linea['id'])) {
			$selected = " selected='selected'";
		} else {
			$selected = '';
		}
		echo "<option value='" . $linea['id'] ."' " . $selected . ">" . $linea['username'] . "</option>\r\n";
	}
	break;
	
	case 'dossier_id':
	$query = "SELECT id,patient FROM dossier";
	$result = mysql_query($query) or $esito = mysql_error();
	while ($linea = mysql_fetch_array($result, MYSQL_ASSOC)) {
		if (isset($_GET['selected']) && ($_GET['selected'] == $linea['id'])) {
			$selected = " selected='selected'";
		} else {
			$selected = '';
		}
		echo "<option value='" . $linea['id'] ."' " . $selected . ">" . $linea['patient'] . "</option>\r\n";
	}
	break;

	default:
	break;

}

?>