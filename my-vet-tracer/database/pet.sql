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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
