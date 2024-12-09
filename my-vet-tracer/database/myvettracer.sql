-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: myvettracer
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `id_appointment` int NOT NULL AUTO_INCREMENT,
  `owner_name` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `veterinarian` varchar(255) DEFAULT NULL,
  `id_pet` int DEFAULT NULL,
  `id_user` int DEFAULT NULL,
  PRIMARY KEY (`id_appointment`),
  KEY `FK6shpbpmxg26or2qug18xhtptv` (`id_pet`),
  KEY `FKq6700eylu4sx03v2uyajtpyl4` (`id_user`),
  CONSTRAINT `FK6shpbpmxg26or2qug18xhtptv` FOREIGN KEY (`id_pet`) REFERENCES `pet` (`id_pet`),
  CONSTRAINT `FKq6700eylu4sx03v2uyajtpyl4` FOREIGN KEY (`id_user`) REFERENCES `vet_user` (`id_vet_user`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` VALUES (1,'Alice Johnson','2024-07-21 10:00:00','Jane Smith',1,1),(2,'John Doe','2024-07-21 11:00:00','Jane Smith',2,1),(3,'John Doe','2024-07-21 12:00:00','Jane Smith',3,1),(4,'Carol Davis','2024-07-22 09:00:00','Frank Wilson',4,4),(5,'Carol Davis','2024-07-22 10:30:00','Bob Brown',5,2),(6,'Iris Moore','2024-07-22 11:00:00','Bob Brown',6,2),(7,'Mia Harris','2024-07-22 14:00:00','Leo White',7,7),(8,'Eve Lee','2024-07-23 09:00:00','David Miller',8,3),(9,'Eve Lee','2024-07-23 10:00:00','Frank Wilson',9,4),(10,'Quinn Martinez','2024-07-23 11:00:00','Hank Taylor',10,5),(11,'Quinn Martinez','2024-07-23 12:00:00','Hank Taylor',11,5),(12,'Karen Jones','2024-07-24 09:00:00','Leo White',12,7),(13,'Karen Jones','2024-07-24 10:00:00','Leo White',13,7),(14,'Olivia Davis','2024-07-25 09:00:00','Paul Anderson',14,9),(15,'Olivia Davis','2024-07-25 10:00:00','Paul Anderson',15,9),(16,'Olivia Davis','2024-07-25 11:00:00','Paul Anderson',16,9),(17,'George Smith','2024-07-26 09:00:00','Rachel Thomas',17,10),(18,'Hanimore Alice','2024-07-26 10:00:00','Nate Martin',18,8),(19,'Hanimore Alice','2024-07-26 11:00:00','Nate Martin',19,8),(20,'Hanimore Alice','2024-07-26 12:00:00','Nate Martin',20,8),(21,'Steven Martin','2024-07-27 09:00:00','Rachel Thomas',21,10),(22,'Linda Wilson','2024-07-27 10:30:00','Jack Smith',22,6),(23,'Nancy Clark','2024-07-27 11:00:00','David Miller',23,3),(24,'Nancy Clark','2024-07-28 09:30:00','David Miller',24,3),(25,'Nancy Clark','2024-07-28 10:00:00','David Miller',25,3),(26,'Nancy Clark','2024-07-28 11:30:00','David Miller',26,3),(27,'George Smith','2024-07-28 13:00:00','Rachel Thomas',17,10),(28,'Hanimore Alice','2024-07-29 09:00:00','Nate Martin',18,8),(29,'Hanimore Alice','2024-07-29 10:00:00','Nate Martin',19,8),(30,'Hanimore Alice','2024-08-30 14:30:30','Nate Martin',20,8);
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invalidated_token`
--

DROP TABLE IF EXISTS `invalidated_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invalidated_token` (
  `id` varchar(255) NOT NULL,
  `expiry_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invalidated_token`
--

LOCK TABLES `invalidated_token` WRITE;
/*!40000 ALTER TABLE `invalidated_token` DISABLE KEYS */;
INSERT INTO `invalidated_token` VALUES ('47b9a028-d045-42a6-bd8d-f55af7a777e2','2024-11-30 02:57:23.000000'),('5528b9e4-0f45-4b6b-9cb1-4d25e07e7cd7','2024-11-30 03:06:06.000000');
/*!40000 ALTER TABLE `invalidated_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicine`
--

DROP TABLE IF EXISTS `medicine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicine` (
  `id_med` int NOT NULL AUTO_INCREMENT,
  `amount` varchar(255) DEFAULT NULL,
  `dose` varchar(255) DEFAULT NULL,
  `med_name` varchar(255) DEFAULT NULL,
  `notice` varchar(255) DEFAULT NULL,
  `total` double DEFAULT NULL,
  `id_pet` int DEFAULT NULL,
  `id_user` int DEFAULT NULL,
  PRIMARY KEY (`id_med`),
  KEY `FKk4am5oq62dvux51c6iw7d1p90` (`id_pet`),
  KEY `FKn8b8pqirr0rs4htywee3qsscl` (`id_user`),
  CONSTRAINT `FKk4am5oq62dvux51c6iw7d1p90` FOREIGN KEY (`id_pet`) REFERENCES `pet` (`id_pet`),
  CONSTRAINT `FKn8b8pqirr0rs4htywee3qsscl` FOREIGN KEY (`id_user`) REFERENCES `vet_user` (`id_vet_user`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicine`
--

LOCK TABLES `medicine` WRITE;
/*!40000 ALTER TABLE `medicine` DISABLE KEYS */;
INSERT INTO `medicine` VALUES (1,'30 tablets','10 mg daily','Antibiotic A','For bacterial infections',15.5,1,1),(2,'20 tablets','5 mg twice daily','Pain Relief B','For pain management',12.5,2,1),(3,'1 vial','Single dose','Vaccine C','For annual vaccination',45,3,1),(4,'10 tablets','20 mg daily','Antibiotic D','For bacterial infections',25,4,4),(5,'15 tablets','15 mg daily','Antifungal E','For fungal infections',30,5,2),(6,'6 tablets','Once a month','Heartworm Preventive F','For heartworm prevention',60,6,2),(7,'30 tablets','2 tablets daily','Anti-inflammatory G','For joint inflammation',20.5,7,7),(8,'15 tablets','1 tablet daily','Allergy Medicine H','For seasonal allergies',15,8,3),(9,'1 vial','Single dose','Vaccine I','For rabies prevention',50,9,4),(10,'10 tablets','5 mg daily','Pain Relief J','For post-surgery pain',10,10,5),(11,'20 tablets','10 mg twice daily','Antibiotic K','For skin infections',35.75,11,5),(12,'1 pack','Apply once a month','Flea Treatment L','For flea prevention',40,12,7),(13,'30 tablets','15 mg daily','Antibiotic M','For bacterial infections',55,13,7),(14,'20 tablets','10 mg daily','Antifungal N','For fungal infections',40,14,9),(15,'10 tablets','5 mg daily','Allergy Medicine O','For allergic reactions',25,15,9),(16,'1 vial','Single dose','Vaccine P','For annual vaccination',45,16,9),(17,'30 tablets','20 mg daily','Antibiotic Q','For respiratory infections',75,17,10),(18,'20 tablets','10 mg twice daily','Pain Relief R','For chronic pain',30,18,8),(19,'3 tablets','Once a month','Heartworm Preventive S','For heartworm prevention',30,19,8),(20,'1 pack','Apply once a month','Flea Treatment T','For flea prevention',40,20,8),(21,'20 tablets','50 mg daily','Pain Reliever B','For pain relief and inflammation',25,21,10),(22,'10 tablets','25 mg twice a day','Anti-inflammatory C','For joint pain',18.5,22,6),(23,'15 tablets','20 mg twice a day','Antibiotic B','For skin infection',22,23,3),(24,'6 tablets','5 mg per month','Heartworm Prevention','Monthly heartworm prevention',45,24,3),(25,'1 tube','Apply twice daily','Antifungal Cream','Topical for fungal infections',12.5,25,3),(26,'30 tablets','10 mg daily','Allergy Relief','For seasonal allergies',30,26,3),(27,'3 vials','2 units twice a day','Diabetes Insulin','For insulin regulation',60,21,10),(28,'1 bottle','Apply 3 drops twice a day','Ear Infection Drops','For ear infections',25,22,6),(29,'1 injection','10 mg','Steroid Injection','For severe allergies',50,23,3),(30,'20 tablets','15 mg twice a day','Antibiotic C','For bacterial infections',28,24,3);
/*!40000 ALTER TABLE `medicine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owner_user`
--

DROP TABLE IF EXISTS `owner_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `owner_user` (
  `id_owner_user` int NOT NULL AUTO_INCREMENT,
  `dob` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `num_of_pet` int DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_num` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_owner_user`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owner_user`
--

LOCK TABLES `owner_user` WRITE;
/*!40000 ALTER TABLE `owner_user` DISABLE KEYS */;
INSERT INTO `owner_user` VALUES (1,'1980-01-12','john.doe@example.com','John Doe','Male',2,'$2a$10$He3olJX1HU8uertagJXxNuYQp0tyZCPbbe.3wur2/SIhb6YcNoFbC','123-456-7890','john_doe'),(2,'1975-05-22','alice.johnson@example.com','Alice Johnson','Female',1,'$2a$10$rGK2kmMCWNegi55tzUw6Ye1DxyXSRMZ.d5oz9M/M7R148p4b/gjsy','345-678-9012','alice_johnson'),(3,'1990-07-30','carol.davis@example.com','Carol Davis','Female',2,'$2a$10$EgaC3oie29hIDrSjyTnYy.Wh/XuWd83LiWPb2lOzO1dcxDlO9O452','567-890-1234','carol_davis'),(4,'1988-12-09','eve.lee@example.com','Eve Lee','Female',2,'$2a$10$t5h..rQ7Hje8hCG4huPEAeVeQwQcedaa.PLnERAG96XvOg9EjgJbq','789-012-3456','eve_lee'),(5,'1995-04-25','iris.moore@example.com','Iris Moore','Female',1,'$2a$10$I7QhjfK7J7IPYlhZ.6mfR.WXDSPrP0EVq3.x9XqsOqE2FMc3QOfma','123-456-7891','iris_moore'),(6,'1983-06-17','karen.jones@example.com','Karen Jones','Female',2,'$2a$10$ho8wUvnEmS1PEcK1tcYUou41tIMN3c7hVXZpybgqeUQ.Oj1edj9sO','345-678-9013','karen_jones'),(7,'1991-08-14','mia.harris@example.com','Mia Harris','Female',1,'$2a$10$LIo1hVRJiHqitBgrokZ9n.gfkyt0nU65pPsU7bD/uOCZMMDi1fShy','567-890-1235','mia_harris'),(8,'1989-11-30','olivia.davis@example.com','Olivia Davis','Female',3,'$2a$10$PEwtH4wQGGMqu5ZkdWN1yOdhIqDLffbHjB/OJP8uimlVTftdoJVLm','789-012-3457','olivia_davis'),(9,'1992-02-28','quinn.martinez@example.com','Quinn Martinez','Male',2,'$2a$10$PzXTKcksPZgqOHh8i4RZf.WN.lepLhCjzVYszySQSJRj4P8vfj0ay','901-234-5679','quinn_martinez'),(10,'1990-12-23','alice.hanimore@example.com','Hanimore Alice','Female',3,'$2a$10$J12sgC/WpUc67kZgMQqKZ.CgoyheRUXZDWqedICkd3LJR87AwrLv.','911-244-7679','alice_hanimore'),(11,'1985-03-12','george.smith@example.com','George Smith','Male',1,'$2a$10$ne1kx2gteCu7ljDyPgWY4O9P6hygUynz2w9I62es71TfWd1wAhtw2','101-234-5670','george_smith'),(12,'1978-09-05','linda.wilson@example.com','Linda Wilson','Female',1,'$2a$10$tusriCj88uRUrv3PyI6k0ujDLS4qZ/qm59dWInlJOcddT88cqqExm','202-345-6781','linda_wilson'),(13,'1993-07-22','steven.martin@example.com','Steven Martin','Male',1,'$2a$10$ZxJZcue2cEXMypXr.T3Zke8DqXbX5/PbAE1fTVkaJzl5wrXSs3tcS','303-456-7892','steven_martin'),(14,'1980-11-30','nancy.clark@example.com','Nancy Clark','Female',4,'$2a$10$xcu5Hpygb.sQGBw1WUQcOOuvCzrlWt3S6LuRRjx68sJZmqycm4Emi','404-567-8903','nancy_clark'),(16,'2000-09-11','lucyandroid@gmail.com','Lucy Android','Female',1,'$2a$10$kkcSLhLA7JP2fHkMx7bKl.g0YrlyPzsqhT7wsaJI634Pen9D9LWA.','855-524-5442','lucy_android'),(18,'2003-03-10','admin@gmai.com','admin','Female',0,'$2a$10$I98PNE9qUEj3vGdGC9I3leDoAszlUWtOjLyJKz1xK409pvGj6E8k2','111-222-5465','admin');
/*!40000 ALTER TABLE `owner_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owner_user_roles`
--

DROP TABLE IF EXISTS `owner_user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `owner_user_roles` (
  `owner_user_id_owner_user` int NOT NULL,
  `roles_name` varchar(255) NOT NULL,
  PRIMARY KEY (`owner_user_id_owner_user`,`roles_name`),
  KEY `FK3sv5skb732ah8ct207gr8offc` (`roles_name`),
  CONSTRAINT `FK3sv5skb732ah8ct207gr8offc` FOREIGN KEY (`roles_name`) REFERENCES `role` (`name`),
  CONSTRAINT `FK92oqqinsel2imf0syeigddryo` FOREIGN KEY (`owner_user_id_owner_user`) REFERENCES `owner_user` (`id_owner_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owner_user_roles`
--

LOCK TABLES `owner_user_roles` WRITE;
/*!40000 ALTER TABLE `owner_user_roles` DISABLE KEYS */;
INSERT INTO `owner_user_roles` VALUES (18,'ADMIN'),(1,'USER'),(2,'USER'),(3,'USER'),(4,'USER'),(5,'USER'),(6,'USER'),(7,'USER'),(8,'USER'),(9,'USER'),(10,'USER'),(11,'USER'),(12,'USER'),(13,'USER'),(14,'USER'),(16,'USER');
/*!40000 ALTER TABLE `owner_user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES ('CREATE DATA','create data permission'),('CREATE VET DATA','create Appoinment, Medicine, Vaccine data permission'),('DELETE DATA','detele data permission'),('DELETE VET DATA','delete related Appoinment, Medicine, Vaccine data permission'),('READ DATA','read data permission'),('READ VET DATA','read related Pets, Owner, Appoinment, Medicine, Vaccine data permission'),('UPDATE DATA','update data permission'),('UPDATE VET DATA','update own account, related Appoinment, Medicine, Vaccine data permission');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pet`
--

DROP TABLE IF EXISTS `pet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pet` (
  `id_pet` int NOT NULL AUTO_INCREMENT,
  `age` int DEFAULT NULL,
  `height` varchar(255) DEFAULT NULL,
  `identification` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `pet_name` varchar(255) DEFAULT NULL,
  `pet_type` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `weight` varchar(255) DEFAULT NULL,
  `id_owner_user` int DEFAULT NULL,
  `id_vet_user` int DEFAULT NULL,
  PRIMARY KEY (`id_pet`),
  KEY `FK43mo9mcgos6mgfqttbnwjeoey` (`id_owner_user`),
  KEY `FKcnbunu9h5ir247xglcp5g9pwy` (`id_vet_user`),
  CONSTRAINT `FK43mo9mcgos6mgfqttbnwjeoey` FOREIGN KEY (`id_owner_user`) REFERENCES `owner_user` (`id_owner_user`),
  CONSTRAINT `FKcnbunu9h5ir247xglcp5g9pwy` FOREIGN KEY (`id_vet_user`) REFERENCES `vet_user` (`id_vet_user`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pet`
--

LOCK TABLES `pet` WRITE;
/*!40000 ALTER TABLE `pet` DISABLE KEYS */;
INSERT INTO `pet` VALUES (1,5,'50cm','Golden retriever with a white patch on chest','https://images.pexels.com/photos/2664417/pexels-photo-2664417.jpeg?auto=compress&cs=tinysrgb&w=600','Simon','Dog','Male','30kg',2,1),(2,5,'50cm','Golden retriever with a white patch on chest','https://i.pinimg.com/564x/53/2f/09/532f09ec0ecb7d40cfd8f5d226d60a5e.jpg','Buddy','Dog','Male','30kg',1,1),(3,3,'25cm','Tabby with white markings and green eyes','https://hips.hearstapps.com/hmg-prod/images/large-cat-breed-1553197454.jpg?https://hips.hearstapps.com/hmg-prod/images/neva-masquerade-royalty-free-image-1674509896.jpg?crop=1.00xw:0.824xh;0,0.0421xh&resize=1200:*','Whiskers','Cat','Female','5kg',1,1),(4,2,'20cm','Colorful feathers with a long tail','https://i.pinimg.com/564x/78/fb/26/78fb262b28ffd290f77efd5a928c7cd8.jpg','Tweety','Bird','Female','0.5kg',3,4),(5,4,'55cm','German shepherd with black and tan fur','https://i.pinimg.com/564x/dd/78/bf/dd78bf545a8c11e694c2df6f0a23ab24.jpg','Rex','Dog','Male','35kg',3,2),(6,6,'30cm','Solid black cat with golden eyes','https://www.katdootje.nl/wp-content/uploads/What-Breed-Are-Black-Cats.webp','Fluffy','Cat','Female','6kg',5,2),(7,1,'15cm','White with floppy ears and brown spots','https://i.pinimg.com/564x/bf/4d/58/bf4d58983bb1365601a789593ebda440.jpg','Thumper','Rabbit','Male','2kg',7,7),(8,7,'45cm','Boxer with a brindle coat','https://i.pinimg.com/564x/b6/7f/e8/b67fe88fbe102e91e86ccd23e71cf2ba.jpg','Max','Dog','Male','25kg',4,3),(9,4,'20cm','Tortoiseshell cat with green eyes','https://thumbor.forbes.com/thumbor/fit-in/1290x/https://www.forbes.com/advisor/wp-content/uploads/2023/09/getty_creative.jpeg.jpg','Bella','Cat','Female','4kg',4,4),(10,2,'50cm','Retriever with a yellow coat, affectionate and easygoing','https://cdn.pixabay.com/photo/2023/09/19/12/34/dog-8262506_1280.jpg','Charlie','Dog','Male','28kg',9,5),(11,3,'22cm','White markings, green eyes, and a playful demeanor','https://images.pexels.com/photos/1828875/pexels-photo-1828875.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','Mittens','Cat','Female','3kg',9,5),(12,5,'28cm','Solid black cat with striking golden eyes and a sleek coat','https://www.forbes.com/advisor/wp-content/uploads/2023/09/British_shorthair.jpeg.jpg','Socks','Cat','Female','4.5kg',6,7),(13,2,'40cm','A sleek black coat, gentle giant with a calm demeanor','https://images.pexels.com/photos/1695632/pexels-photo-1695632.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','Daisy','Dog','Female','20kg',6,7),(14,4,'52cm','Curly white fur, intelligent and lively','https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','Lucy','Dog','Female','32kg',8,9),(15,3,'26cm','Classic striped orange tabby with a bold and energetic attitude','https://www.forbes.com/advisor/wp-content/uploads/2023/09/Sphynx.jpeg.jpg','Oscar','Cat','Male','5kg',8,9),(16,1,'22cm','Small green parakeet with a yellow head','https://i.pinimg.com/564x/2f/81/31/2f8131641ca3def614c9ed49b79dc523.jpg','Polly','Bird','Female','0.6kg',8,9),(17,6,'60cm','Large brown Rottweiler with a sturdy build','https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','Bruno','Dog','Male','40kg',11,10),(18,4,'25cm','Black cat with piercing green eyes','https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','Shadow','Cat','Female','4kg',10,8),(19,3,'18cm','Blue and white parakeet with a chirpy personality','https://images.pexels.com/photos/56733/pexels-photo-56733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','Sky','Bird','Male','0.3kg',10,8),(20,5,'55cm','Strong bulldog with a muscular build and white coat','https://images.pexels.com/photos/1458916/pexels-photo-1458916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','Rocky','Dog','Male','35kg',10,8),(21,2,'22cm','Sleek Siamese cat with blue eyes and cream fur','https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','Cleo','Cat','Female','3.5kg',13,10),(22,1,'20cm','Small white rabbit with pink nose and long ears','https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','Snowball','Rabbit','Male','1.8kg',12,6),(23,3,'45cm','Beagle with brown, black, and white fur','https://images.pexels.com/photos/733416/pexels-photo-733416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','Buster','Dog','Male','22kg',14,3),(24,4,'26cm','Orange tabby with white paws and playful attitude','https://images.pexels.com/photos/208773/pexels-photo-208773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','Simba','Cat','Male','4.2kg',14,3),(25,2,'15cm','Gray cockatiel with orange cheeks and yellow crest','https://images.pexels.com/photos/2078772/pexels-photo-2078772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','Pepper','Bird','Female','0.4kg',14,3),(26,7,'65cm','Large German Shepherd with a commanding presence','https://images.pexels.com/photos/544269/pexels-photo-544269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','Zeus','Dog','Male','53kg',14,3),(27,1,'40cm','A small, fluffy brown rabbit with soft fur, big round eyes, and long ears that perk up attentively.','https://images.pexels.com/photos/104373/pexels-photo-104373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1','Hanie','Rabbit','Female','0.5kg',16,11);
/*!40000 ALTER TABLE `pet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES ('ADMIN','admin role'),('USER','user role'),('VET_USER','Veterinarian role');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permissions` (
  `role_name` varchar(255) NOT NULL,
  `permissions_name` varchar(255) NOT NULL,
  PRIMARY KEY (`role_name`,`permissions_name`),
  KEY `FKf5aljih4mxtdgalvr7xvngfn1` (`permissions_name`),
  CONSTRAINT `FKcppvu8fk24eqqn6q4hws7ajux` FOREIGN KEY (`role_name`) REFERENCES `role` (`name`),
  CONSTRAINT `FKf5aljih4mxtdgalvr7xvngfn1` FOREIGN KEY (`permissions_name`) REFERENCES `permission` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permissions`
--

LOCK TABLES `role_permissions` WRITE;
/*!40000 ALTER TABLE `role_permissions` DISABLE KEYS */;
INSERT INTO `role_permissions` VALUES ('ADMIN','CREATE DATA'),('VET_USER','CREATE VET DATA'),('ADMIN','DELETE DATA'),('VET_USER','DELETE VET DATA'),('ADMIN','READ DATA'),('USER','READ DATA'),('VET_USER','READ VET DATA'),('ADMIN','UPDATE DATA'),('USER','UPDATE DATA'),('VET_USER','UPDATE VET DATA');
/*!40000 ALTER TABLE `role_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_num` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `user_type` int DEFAULT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vaccine`
--

DROP TABLE IF EXISTS `vaccine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vaccine` (
  `id_vac` int NOT NULL AUTO_INCREMENT,
  `date` varchar(255) DEFAULT NULL,
  `dose` varchar(255) DEFAULT NULL,
  `total` double DEFAULT NULL,
  `vac_name` varchar(255) DEFAULT NULL,
  `id_pet` int DEFAULT NULL,
  `id_user` int DEFAULT NULL,
  PRIMARY KEY (`id_vac`),
  KEY `FKny98gcqn6c68fsc4udftfeyy3` (`id_pet`),
  KEY `FKnmkbwnwsliuh84jbfj93a70s3` (`id_user`),
  CONSTRAINT `FKnmkbwnwsliuh84jbfj93a70s3` FOREIGN KEY (`id_user`) REFERENCES `vet_user` (`id_vet_user`),
  CONSTRAINT `FKny98gcqn6c68fsc4udftfeyy3` FOREIGN KEY (`id_pet`) REFERENCES `pet` (`id_pet`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaccine`
--

LOCK TABLES `vaccine` WRITE;
/*!40000 ALTER TABLE `vaccine` DISABLE KEYS */;
INSERT INTO `vaccine` VALUES (1,'2024-01-15','1 ml',30.5,'Rabies Vaccine',1,1),(2,'2024-02-10','1.5 ml',35,'Distemper Vaccine',2,1),(3,'2024-03-05','1 ml',28,'Parvovirus Vaccine',3,1),(4,'2024-04-18','1 ml',40,'Hepatitis Vaccine',4,4),(5,'2024-05-12','1 ml',32.5,'Leptospirosis Vaccine',5,2),(6,'2024-06-08','1.5 ml',36,'Bordetella Vaccine',6,2),(7,'2024-07-15','1 ml',30,'Parainfluenza Vaccine',7,7),(8,'2024-08-23','1.5 ml',38,'Canine Influenza Vaccine',8,3),(9,'2024-09-05','1 ml',33.5,'Lyme Disease Vaccine',9,4),(10,'2024-10-19','1 ml',40,'Feline Herpesvirus Vaccine',10,5),(11,'2024-11-05','1.2 ml',34.5,'Feline Calicivirus Vaccine',11,5),(12,'2024-11-25','1 ml',45,'Feline Leukemia Vaccine',12,7),(13,'2024-12-10','1.5 ml',50,'Feline Immunodeficiency Virus Vaccine',13,7),(14,'2024-12-22','1 ml',30.5,'Rabies Vaccine',14,9),(15,'2024-12-30','1 ml',35,'Canine Coronavirus Vaccine',15,9),(16,'2025-01-05','1 ml',28,'Distemper Vaccine',16,9),(17,'2025-01-15','1.2 ml',40,'Hepatitis Vaccine',17,10),(18,'2025-01-25','1.5 ml',36,'Parvovirus Vaccine',18,8),(19,'2025-02-05','1 ml',32.5,'Leptospirosis Vaccine',19,8),(20,'2025-02-20','1.5 ml',36,'Bordetella Vaccine',20,8),(21,'2025-03-10','1 ml',35,'Canine Distemper Vaccine',21,10),(22,'2025-03-22','1 ml',45,'Feline Leukemia Vaccine',22,6),(23,'2025-04-05','1 ml',30.5,'Rabies Vaccine',23,3),(24,'2025-04-17','1.5 ml',38,'Canine Influenza Vaccine',24,3),(25,'2025-05-01','1 ml',33.5,'Lyme Disease Vaccine',25,3),(26,'2025-05-15','1.2 ml',34.5,'Feline Calicivirus Vaccine',26,3),(27,'2025-06-02','1 ml',32.5,'Leptospirosis Vaccine',21,10),(28,'2025-06-10','1 ml',40,'Feline Herpesvirus Vaccine',22,6),(29,'2025-06-20','1 ml',28,'Canine Distemper Vaccine',23,3),(30,'2025-07-05','1 ml',30.5,'Rabies Vaccine',24,3);
/*!40000 ALTER TABLE `vaccine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vet_user`
--

DROP TABLE IF EXISTS `vet_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vet_user` (
  `id_vet_user` int NOT NULL AUTO_INCREMENT,
  `authentication` int DEFAULT NULL,
  `clinic_address` varchar(255) DEFAULT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `experience` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `name_of_consulting_room` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_num` varchar(255) DEFAULT NULL,
  `qualification` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_vet_user`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vet_user`
--

LOCK TABLES `vet_user` WRITE;
/*!40000 ALTER TABLE `vet_user` DISABLE KEYS */;
INSERT INTO `vet_user` VALUES (1,1,'123 Green Valley Rd, Springfield','1988-02-28','jane.smith@example.com','10 years in small animal practice','Jane Smith','Female','Green Valley Veterinary Clinic','$2a$10$pxoC2eRBRPz0KHugZpDFD.bE3lE0qcL.X5HdfEFOhCqUF/SPElhsq','234-567-8901','DVM, Board Certified in Internal Medicine','jane_smith'),(2,0,'456 Sunnydale Ave, Springfield','1990-02-28','bob.brown@example.com','8 years in large animal practice','Bob Brown','Male','Sunnydale Animal Hospital','$2a$10$oSKjK6mKlAuoney5HaEUsOLy8dhqKZwixPTSgyfyZ6.wfRRhoGe8C','456-789-0123','DVM, Specialization in Surgery','bob_brown'),(3,1,'789 Oakwood Dr, Springfield','1988-12-08','david.miller@example.com','12 years in mixed practice','David Miller','Male','Oakwood Veterinary Services','$2a$10$9naYyhzF7q3XeEemg5Sn2OvaOxhh7UPdqTndO02honW6UDHRrzmkK','678-901-2345','DVM, Advanced in Cardiology','david_miller'),(4,1,'101 Lakeside Blvd, Springfield','1983-03-15','frank.wilson@example.com','15 years in small animal practice','Frank Wilson','Male','Lakeside Veterinary Clinic','$2a$10$kavUn9Dbe9UrqHaggEL43OwpSon5DUkj6mynn8Y9HvZTnN9HRXy.C','890-123-4567','DVM, Specialization in Dermatology','frank_wilson'),(5,0,'202 Mountainview St, Springfield','1992-07-31','hank.taylor@example.com','5 years in mixed practice','Hank Taylor','Male','Mountainview Animal Clinic','$2a$10$WhGH/cFw7a3VdKqsonSR2OfdkdooDzi.D/kFiWSXai0C4kgKCbBKy','012-345-6789','DVM, General Practice','hank_taylor'),(6,1,'303 Riverside Dr, Springfield','1976-06-02','jack.smith@example.com','7 years in small animal practice','Jack Smith','Male','Riverside Animal Hospital','$2a$10$yrSoML2slGIY0.Wb7qk1POePAI9owY/l9w208bvrp6.7Dl1dRhyr2','234-567-8902','DVM, Board Certified in Orthopedics','jack_smith'),(7,1,'404 Westwood Ln, Springfield','1977-06-13','leo.white@example.com','11 years in small animal practice','Leo White','Male','Westwood Veterinary Clinic','$2a$10$ENvsLLQ4TXFgdbi9F64FCe4F6FUmWDt0Io0PDSGgwDCe6LF.6B5e.','456-789-0124','DVM, Specialization in Neurology','leo_white'),(8,0,'505 Pinecrest Blvd, Springfield','1962-12-18','nate.martin@example.com','6 years in mixed practice','Nate Martin','Male','Pinecrest Veterinary Services','$2a$10$IgVTXFW.HazELVJUXy1hhucGEYyInH5.RTQFV.2ad.Kok.NkmjSQ.','678-901-2346','DVM, Advanced in Medicine','nate_martin'),(9,1,'606 Clearwater St, Springfield','1995-09-12','paul.anderson@example.com','14 years in exotic animal practice','Paul Anderson','Male','Clearwater Animal Clinic','$2a$10$mEPOOZ13Sh4pHGHanagXeOFQEPBUcQuCQxyu9h4Bq8zltWcqP603y','890-123-4568','DVM, Specialization in Exotic Animals','paul_anderson'),(10,1,'707 Seaside Dr, Springfield','1988-05-30','rachel.thomas@example.com','9 years in mixed practice','Rachel Thomas','Female','Seaside Veterinary Clinic','password4455','012-345-1111','DVM, Advanced in Surgery','rachel_thomas'),(11,1,'31st, Backer road, London, UK','2000-07-12','seansophie@gmail.com','With two years of professional experience at London Vet Specialists, I served as a primary care physician, providing comprehensive medical care and ensuring high standards of treatment for a diverse range of animal patients.','Sean Sophie','Female','Happy Pie\'s Friends','$2a$10$Fl9DlnQVoYKBt0icmWHcJ.ZmBgrUwgnGhANLo49FugGwW73bd3LYW','455-842-5456','DVM, General Practice','@Seany');
/*!40000 ALTER TABLE `vet_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vet_user_roles`
--

DROP TABLE IF EXISTS `vet_user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vet_user_roles` (
  `vet_user_id_vet_user` int NOT NULL,
  `roles_name` varchar(255) NOT NULL,
  PRIMARY KEY (`vet_user_id_vet_user`,`roles_name`),
  KEY `FKtfl9cvhyj1gl14144tb4nxhos` (`roles_name`),
  CONSTRAINT `FKsma7s903ihwyp8vpcktaj4ist` FOREIGN KEY (`vet_user_id_vet_user`) REFERENCES `vet_user` (`id_vet_user`),
  CONSTRAINT `FKtfl9cvhyj1gl14144tb4nxhos` FOREIGN KEY (`roles_name`) REFERENCES `role` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vet_user_roles`
--

LOCK TABLES `vet_user_roles` WRITE;
/*!40000 ALTER TABLE `vet_user_roles` DISABLE KEYS */;
INSERT INTO `vet_user_roles` VALUES (1,'VET_USER'),(2,'VET_USER'),(3,'VET_USER'),(4,'VET_USER'),(5,'VET_USER'),(6,'VET_USER'),(7,'VET_USER'),(8,'VET_USER'),(9,'VET_USER'),(10,'VET_USER'),(11,'VET_USER');
/*!40000 ALTER TABLE `vet_user_roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-02 15:04:59
