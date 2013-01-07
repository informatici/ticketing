<div id="topmenu">

	<div id="menucontainer">
		<div class="content clearfix">
	
		<ul class="mainmenu">
			<li class="mainsubmenu submenu1">
				<div>Medici</div>
				<ul>
				<? if ($_SESSION["medical_creation"]) { ?>
					<li><a class="menu" href="medical_create.php" title="Inserisci un nuovo medico">Nuovo Medico</a></li>
				<? } ?>
					<li><a class="menu" href="medical.php" title="Visualizza la lista dei medici">Lista Medici</a></li>
				</ul>
			</li>
			
			<li class="mainsubmenu submenu2">
				<div>Pazienti</div>
				<ul>
				<? if ($_SESSION["patient_creation"]) { ?>
					<li><a class="menu" href="patient_create.php" title="Inserisci un nuovo paziente">Nuovo Paziente</a></li>
				<? } ?>
					<li><a class="menu" href="patients.php" title="Visualizza la lista dei pazienti">Lista Pazienti</a></li>
				</ul>
			</li>
			
			<li class="mainsubmenu submenu3">
				<div>Parenti</div>
				<ul>
				<? if ($_SESSION["relative_creation"]) { ?>
					<li><a class="menu" href="relative_create.php" title="Inserisci un nuovo parente">Nuovo Parente</a></li>
				<? } ?>
					<li><a class="menu" href="relative.php" title="Visualizza la lista dei parenti">Lista Parenti</a></li>
				</ul>
			</li>

			<li class="mainsubmenu submenu4">
				<div>Dossier</div>
				<ul>
				<? if ($_SESSION["dossier_creation"]) { ?>
					<li><a class="menu" href="dossier_create.php" title="Inserisci un nuovo dossier">Nuovo Dossier</a></li>
				<? } ?>
					<li><a class="menu" href="dossier.php" title="Visualizza la lista dei dossier">Lista Dossier</a></li>
				</ul>
			</li>
		</ul>
		
		</div>
	</div>	

	<div class="menutab">
		<ul class="menutogglecontainer">
	    	<li class="left">&nbsp;</li>
	        <li><img src="../images/menutab_logo.png" alt="logo adt" /></li>
			<li id="menutoggle">
				<a id="open" class="open" title="apri il menu" href="#" accesskey="o">|&nbsp;&nbsp;&nbsp;<u>o</u>pen menu</a>
				<a id="close" style="display:none;" class="close" title="chiudi il menu" href="#" accesskey="c">|&nbsp;&nbsp;&nbsp;<u>c</u>lose menu</a>
			</li>
			<li><a class="menu" href="logout.php" title="Esci dall'applicazione">|&nbsp;&nbsp;&nbsp;logout</a></li>
	    	<li class="right">&nbsp;</li>
		</ul> 
	</div> <!-- / top -->
	
</div>