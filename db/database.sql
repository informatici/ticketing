/*
SQLyog Community v8.4 Beta1
MySQL - 5.1.46-community : Database - rodenicc_walks
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`rodenicc_walks` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `rodenicc_walks`;

/*Table structure for table `dossier` */

CREATE TABLE `dossier` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `patient` varchar(48) DEFAULT NULL,
  `ticket_patient` varchar(32) DEFAULT NULL,
  `disease` varchar(300) DEFAULT NULL,
  `symptoms` varchar(100) DEFAULT NULL,
  `temperature` varchar(4) DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL,
  `age` int(2) DEFAULT NULL,
  `cure` varchar(250) DEFAULT NULL,
  `medical_id` mediumint(9) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

/*Data for the table `dossier` */

insert  into `dossier`(`id`,`patient`,`ticket_patient`,`disease`,`symptoms`,`temperature`,`gender`,`age`,`cure`,`medical_id`) values (1,'Lucia Denoia','97217662051','bronchite','tosse','39','M',25,'Penicillina',45);
insert  into `dossier`(`id`,`patient`,`ticket_patient`,`disease`,`symptoms`,`temperature`,`gender`,`age`,`cure`,`medical_id`) values (4,'Francesca Rossi','103911093920','tonsillite','febbre','38','F',58,'flebo ',41);
insert  into `dossier`(`id`,`patient`,`ticket_patient`,`disease`,`symptoms`,`temperature`,`gender`,`age`,`cure`,`medical_id`) values (5,'Albina Cecchini','112772463705','bronchite','tosse','38','F',50,'sciroppo',41);
insert  into `dossier`(`id`,`patient`,`ticket_patient`,`disease`,`symptoms`,`temperature`,`gender`,`age`,`cure`,`medical_id`) values (6,'Nicoletta Leone','73885328424','rottura braccio','scomposizione arti','36','F',24,'gesso',41);
insert  into `dossier`(`id`,`patient`,`ticket_patient`,`disease`,`symptoms`,`temperature`,`gender`,`age`,`cure`,`medical_id`) values (7,'Luigi Rossi','93304589040','diabete','gonfiore','36.5','M',59,'insulina',45);
insert  into `dossier`(`id`,`patient`,`ticket_patient`,`disease`,`symptoms`,`temperature`,`gender`,`age`,`cure`,`medical_id`) values (8,'Giusy Fazio','122168975018','infezione braccio','febbre','38','F',36,'antibiotico e medicazioni ',55);

/*Table structure for table `users` */

CREATE TABLE `users` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(48) DEFAULT NULL,
  `surname` varchar(48) DEFAULT NULL,
  `birth_date` varchar(10) DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL,
  `ticket` varchar(32) DEFAULT NULL,
  `specialization` varchar(300) DEFAULT NULL,
  `username` varchar(48) DEFAULT NULL,
  `password` varchar(48) DEFAULT NULL,
  `user_type` varchar(15) DEFAULT NULL,
  `user_creation` varchar(1) NOT NULL DEFAULT '0',
  `medical_creation` varchar(1) NOT NULL DEFAULT '0',
  `patient_creation` varchar(1) NOT NULL DEFAULT '0',
  `relative_creation` varchar(1) NOT NULL DEFAULT '0',
  `dossier_creation` varchar(1) NOT NULL DEFAULT '0',
  `removable` int(1) NOT NULL DEFAULT '1',
  `medical_id` mediumint(9) DEFAULT NULL,
  `patient_id` mediumint(9) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`surname`,`birth_date`,`gender`,`ticket`,`specialization`,`username`,`password`,`user_type`,`user_creation`,`medical_creation`,`patient_creation`,`relative_creation`,`dossier_creation`,`removable`,`medical_id`,`patient_id`,`email`) values (17,NULL,NULL,NULL,NULL,NULL,NULL,'administrator','numapompilio','administrator','1','1','1','1','1',0,NULL,NULL,NULL);
insert  into `users`(`id`,`name`,`surname`,`birth_date`,`gender`,`ticket`,`specialization`,`username`,`password`,`user_type`,`user_creation`,`medical_creation`,`patient_creation`,`relative_creation`,`dossier_creation`,`removable`,`medical_id`,`patient_id`,`email`) values (41,'nicola','bianchi',NULL,NULL,NULL,'chirurgia','medico','medico','medical','0','0','1','0','1',1,NULL,0,'nicola.bianchi@hotmail.it');
insert  into `users`(`id`,`name`,`surname`,`birth_date`,`gender`,`ticket`,`specialization`,`username`,`password`,`user_type`,`user_creation`,`medical_creation`,`patient_creation`,`relative_creation`,`dossier_creation`,`removable`,`medical_id`,`patient_id`,`email`) values (42,'luigi','rossi','18/04/1958','M','93304589040',NULL,'paziente','paziente','patient','0','0','0','1','0',1,45,NULL,NULL);
insert  into `users`(`id`,`name`,`surname`,`birth_date`,`gender`,`ticket`,`specialization`,`username`,`password`,`user_type`,`user_creation`,`medical_creation`,`patient_creation`,`relative_creation`,`dossier_creation`,`removable`,`medical_id`,`patient_id`,`email`) values (43,'Marco','Verdi',NULL,NULL,NULL,NULL,'parente','parente','relative','0','0','0','0','0',1,NULL,46,NULL);
insert  into `users`(`id`,`name`,`surname`,`birth_date`,`gender`,`ticket`,`specialization`,`username`,`password`,`user_type`,`user_creation`,`medical_creation`,`patient_creation`,`relative_creation`,`dossier_creation`,`removable`,`medical_id`,`patient_id`,`email`) values (44,'nicoletta','leone','17/02/1987','F','73885328424',NULL,'nikita','nikita','patient','0','0','0','1','0',1,41,NULL,NULL);
insert  into `users`(`id`,`name`,`surname`,`birth_date`,`gender`,`ticket`,`specialization`,`username`,`password`,`user_type`,`user_creation`,`medical_creation`,`patient_creation`,`relative_creation`,`dossier_creation`,`removable`,`medical_id`,`patient_id`,`email`) values (45,'franco','giallo',NULL,NULL,NULL,'chirurgia','franchino','giallino','medical','0','0','1','0','1',1,NULL,NULL,'franchino.giallino@alice.it');
insert  into `users`(`id`,`name`,`surname`,`birth_date`,`gender`,`ticket`,`specialization`,`username`,`password`,`user_type`,`user_creation`,`medical_creation`,`patient_creation`,`relative_creation`,`dossier_creation`,`removable`,`medical_id`,`patient_id`,`email`) values (46,'albina','cecchini','18/04/1948','F','112772463705',NULL,'albina','albina','patient','0','0','0','1','0',1,41,NULL,NULL);
insert  into `users`(`id`,`name`,`surname`,`birth_date`,`gender`,`ticket`,`specialization`,`username`,`password`,`user_type`,`user_creation`,`medical_creation`,`patient_creation`,`relative_creation`,`dossier_creation`,`removable`,`medical_id`,`patient_id`,`email`) values (47,'lucia','denoia','26/06/1956','F','97217662051',NULL,'trilly','trillin','patient','0','0','0','1','0',1,45,NULL,NULL);
insert  into `users`(`id`,`name`,`surname`,`birth_date`,`gender`,`ticket`,`specialization`,`username`,`password`,`user_type`,`user_creation`,`medical_creation`,`patient_creation`,`relative_creation`,`dossier_creation`,`removable`,`medical_id`,`patient_id`,`email`) values (48,'federico','manganello','26/06/1956','F','97217662051',NULL,'precious','precious','relative','0','0','0','0','0',1,NULL,47,NULL);
insert  into `users`(`id`,`name`,`surname`,`birth_date`,`gender`,`ticket`,`specialization`,`username`,`password`,`user_type`,`user_creation`,`medical_creation`,`patient_creation`,`relative_creation`,`dossier_creation`,`removable`,`medical_id`,`patient_id`,`email`) values (53,'francesca','rossi','17/02/1948','F','103911093920',NULL,'Monkey','scimmia87','patient','0','0','0','1','0',1,41,NULL,NULL);
insert  into `users`(`id`,`name`,`surname`,`birth_date`,`gender`,`ticket`,`specialization`,`username`,`password`,`user_type`,`user_creation`,`medical_creation`,`patient_creation`,`relative_creation`,`dossier_creation`,`removable`,`medical_id`,`patient_id`,`email`) values (54,'Franco','Lucanie',NULL,NULL,NULL,NULL,'LittleMonkey','scimmia87','relative','0','0','0','0','0',1,NULL,53,NULL);
insert  into `users`(`id`,`name`,`surname`,`birth_date`,`gender`,`ticket`,`specialization`,`username`,`password`,`user_type`,`user_creation`,`medical_creation`,`patient_creation`,`relative_creation`,`dossier_creation`,`removable`,`medical_id`,`patient_id`,`email`) values (55,'Marco','Rossi','','',NULL,'chirurgia','mister','mister','medical','0','0','1','0','1',1,NULL,0,'marco.rossi@live.it');
insert  into `users`(`id`,`name`,`surname`,`birth_date`,`gender`,`ticket`,`specialization`,`username`,`password`,`user_type`,`user_creation`,`medical_creation`,`patient_creation`,`relative_creation`,`dossier_creation`,`removable`,`medical_id`,`patient_id`,`email`) values (56,'Maria','Magarelli',NULL,NULL,NULL,NULL,'Micia','micina','relative','0','0','0','0','0',1,NULL,44,NULL);
insert  into `users`(`id`,`name`,`surname`,`birth_date`,`gender`,`ticket`,`specialization`,`username`,`password`,`user_type`,`user_creation`,`medical_creation`,`patient_creation`,`relative_creation`,`dossier_creation`,`removable`,`medical_id`,`patient_id`,`email`) values (57,'Giusy','Fazio','18/04/1948','F','122168975018',NULL,'Luna','Pienissima','patient','0','0','0','1','0',1,55,NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
