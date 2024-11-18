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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
