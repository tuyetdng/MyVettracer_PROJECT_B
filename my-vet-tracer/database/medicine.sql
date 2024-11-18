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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
