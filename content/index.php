<?
$pagename = 'index';
include ('config.php');
include ('ajax_init.php');
include ('header.php');
?>

<body class="home">

<div id="homecontainer">

	<div id="hometop"></div>
	
	<div id="homelogin">
		<form action="#" name="mainform" id="mainform" method="post">
			<fieldset>
				<input type="hidden" name="pagename" id="pagename" value="<? echo $pagename; ?>" />
				<label for="username">Username:</label>
				<input type="text" name="username" id="username" value="" class="text" onkeypress="sjbjl_checkfield(this,event,'minl=6,maxl=24,mandatory=true,valuetype=username,label=username');" />
				<label for="password">Password:</label>
				<input type="password" name="password" id="password" value="" class="text" onkeypress="sjbjl_checkfield(this,event,'minl=6,maxl=24,mandatory=true,valuetype=password,label=password');" />
				<input type="submit" name="submit" id="submit" class="generalbutton" value="login" />
			</fieldset>
		</form>
		<a href="http://www.informaticisenzafrontiere.org/" class="credits" target="blank" title="ISF - Informatici Senza Frontiere">&nbsp;</a>
	</div>

</div>

</body>

</html>