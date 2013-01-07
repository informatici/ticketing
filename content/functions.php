<?

function isMeetingRunningURL($meetingID,$URL,$SALT) {
	$base_url = $URL."api/isMeetingRunning?";
	$params = 'meetingID='.urlencode($meetingID);
	return ($base_url.$params.'&checksum='.sha1("isMeetingRunning".$params.$SALT));
}

function joinURL($meetingID,$userName,$PW,$SALT,$URL) {
	$url_join = $URL."api/join?";
	$params = 'meetingID='.urlencode($meetingID).'&fullName='.urlencode($userName).'&password='.urlencode($PW);
	return ($url_join.$params.'&checksum='.sha1("join".$params.$SALT));
}

function createMeetingURL($name,$meetingID,$attendeePW,$moderatorPW,$welcome,$logoutURL,$SALT,$URL) {
	$url_create = $URL."api/create?";
	$voiceBridge = 70000 + rand(0, 9999);
	$params = 'name='.urlencode($name).'&meetingID='.urlencode($meetingID).'&attendeePW='.urlencode($attendeePW).'&moderatorPW='.urlencode($moderatorPW).'&voiceBridge='.$voiceBridge.'&logoutURL='.urlencode($logoutURL);
	if (trim($welcome)) {
		$params .= '&welcome='.urlencode($welcome);
	}
	return ($url_create.$params.'&checksum='.sha1("create".$params.$SALT));
}

function getMeetingInfoURL($meetingID,$modPW,$URL,$SALT) {
	$base_url = $URL."api/getMeetingInfo?";
	$params = 'meetingID='.urlencode($meetingID).'&password='.urlencode($modPW);
	return ($base_url.$params.'&checksum='.sha1("getMeetingInfo".$params.$SALT));
}

function getMeetingsURL($URL,$SALT) {
	$base_url = $URL."api/getMeetings?";
	$params = 'random='.(rand() * 1000);
	return ($base_url.$params.'&checksum='.sha1("getMeetings".$params.$SALT));
}

function endMeetingURL($meetingID, $modPW, $URL, $SALT) {
	$base_url = $URL."api/end?";
	$params = 'meetingID='.urlencode($meetingID).'&password='.urlencode($modPW);
	return ($base_url.$params.'&checksum='.sha1("end".$params.$SALT));
} 

?>