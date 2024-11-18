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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
