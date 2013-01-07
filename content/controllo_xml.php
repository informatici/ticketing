<?
@session_start();
@header("Cache-control: private");
@header('Content-Type: text/html; charset=iso-8859-1');
include ('config.php');
include ('ajax_init.php');
include ('functions.php');

if (!isset($_SESSION['name']) || ($_SESSION['name'] == '')) {
	$_SESSION['name'] = $_GET['name'];
}

if (!isset($_SESSION['surname']) || ($_SESSION['surname'] == '')) {
	$_SESSION['surname'] = $_GET['surname'];
}

$ticket = $_GET['ticket_patient'];
$patient = $_GET['patient'];
$username = $_GET['username'];

// creo la url di join
$bbb_join_url = "http://" . $bbb_server_ip . "/demo/create.jsp?meetingID=" . $ticket . "&action=enter&username=" . $patient ."&submit=join";

// verifico se il meeting è già in corso o meno
$bbb_api_ismeetingrunning = isMeetingRunningURL($ticket,"http://" . $bbb_server_ip . "/bigbluebutton/",$bbb_security_salt);
$xml_ismeetingrunning = simplexml_load_file($bbb_api_ismeetingrunning);

echo "<br /><a href='" . $bbb_join_url . "'>bbb_join_url<br /><br />";
echo "<br /><a href='" . $bbb_api_ismeetingrunning . "'>bbb_api_ismeetingrunning</a><br /><br />";

foreach($xml_ismeetingrunning->returncode as $returncode_ismeetingrunning) {

	switch($returncode_ismeetingrunning) {

		// effettuata la verifica, leggo la risposta
		case 'SUCCESS':

		// verifico il contenuto del tag "running"
		foreach($xml_ismeetingrunning->running as $running_ismeetingrunning) {

			switch($running_ismeetingrunning) {

				// il meeting non è in corso, devo crearlo
				case 'false':
				$bbb_api_endmeeting = endMeetingURL($ticket,"walksmod","http://" . $bbb_server_ip . "/bigbluebutton/",$bbb_security_salt);
				$xml_endmeeting = simplexml_load_file($bbb_api_endmeeting);
				echo "<br /><a href='" . $bbb_api_endmeeting . "'>bbb_api_endmeeting</a><br /><br />";

				// genero l'url e lo mostro per fini di debug
				$bbb_api_createmeeting = createMeetingURL($patient,$ticket,"walksatt","walksmod","Benvenuto, " . $_SESSION["surname"] . " " . $_SESSION["name"] . " sta prendendo parte al meeting di " . $patient,"http://isf-walks.sinapto.net/content/dossier.php",$bbb_security_salt,"http://" . $bbb_server_ip . "/bigbluebutton/");
				echo "<br /><a href='" . $bbb_api_createmeeting . "'>bbb_api_createmeeting</a><br /><br />";

				// faccio la richiesta di creazione
				$xml_createmeeting = simplexml_load_file($bbb_api_createmeeting);

				// leggo la risposta
				foreach($xml_createmeeting->returncode as $returncode_createmeeting) {

					switch($returncode_createmeeting) {

						// ho creato il meeting con successo, mi ci connetto come moderatore, passando la password del moderatore
						case 'SUCCESS':
						$bbb_api_joinmeeting = joinURL($ticket,$_SESSION["surname"] . " " . $_SESSION["name"],"walksmod",$bbb_security_salt,"http://" . $bbb_server_ip . "/bigbluebutton/");
						echo "<br /><a href='" . $bbb_api_joinmeeting . "'>bbb_api_joinmeeting</a><br /><br />";
						header('Location: ' . $bbb_api_joinmeeting);
						break;

						// non sono riuscito a creare il meeting, non faccio niente
						case 'FAILED':
						echo 'Riprovare più tardi!';
						break;
					}
				}

				break;

				// il meeting è già in corso, mi ci collego come ospite
				case 'true':
				$bbb_api_joinmeeting = joinURL($ticket,$_SESSION["surname"] . " " . $_SESSION["name"],"walksatt",$bbb_security_salt,"http://" . $bbb_server_ip . "/bigbluebutton/");
				echo "<br /><a href='" . $bbb_api_joinmeeting . "'>bbb_api_joinmeeting</a><br /><br />";
				header('Location: ' . $bbb_api_joinmeeting);
				break;
			}

		}
		break;

		// la verifica è fallita, esco
		case 'FAILED':
		echo "caso5";
		echo 'Riprovare più tardi!';
		break;
	}
}

?>