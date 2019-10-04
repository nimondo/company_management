-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  ven. 04 oct. 2019 à 13:19
-- Version du serveur :  5.7.24
-- Version de PHP :  7.1.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `teamgae`
--

-- --------------------------------------------------------

--
-- Structure de la table `employe`
--

DROP TABLE IF EXISTS `employe`;
CREATE TABLE IF NOT EXISTS `employe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entreprise_id` int(11) DEFAULT NULL,
  `nom` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `prenom` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `telephone` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_F804D3B9A4AEAFEA` (`entreprise_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `employe`
--

INSERT INTO `employe` (`id`, `entreprise_id`, `nom`, `prenom`, `email`, `telephone`) VALUES
(2, 1, 'ici un nom', 'edem', 'nidzang@hkf.fc', '91555624'),
(3, 27, 'nimondo', 'edem', 'znimed@gmail.com', '91555624'),
(5, 35, 'kasi', 'lok', 'edy@lome.com', '98456235'),
(6, 32, 'loti', 'loto', 'znimed@gmail.com', '98556247'),
(7, 33, 'bliz', 'blok', 'zita@ggh.rf', '98555624'),
(8, 35, 'edem', 'kadi2', 'znimed@gmail.com', '95242424');

-- --------------------------------------------------------

--
-- Structure de la table `entreprise`
--

DROP TABLE IF EXISTS `entreprise`;
CREATE TABLE IF NOT EXISTS `entreprise` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `logo` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `site_web` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `entreprise`
--

INSERT INTO `entreprise` (`id`, `nom`, `email`, `logo`, `site_web`) VALUES
(1, 'ici un nom', 'nidzang', 'ici un pli', 'ici une adresse'),
(2, 'ici un nom', 'nidzang', 'ici un LOGO', 'ici une adresse'),
(27, 'zangui', 'znimed@gmail.com', 'kadi', 'mail'),
(32, 'fullstack nanodegree', 'znimed@gmail.com', 'logoafi3-5d8e9e4c59276.png', 'https://nimondo.com'),
(33, 'edemus', 'edy@lome.com', 'logoafi2-5d8f44e7a0a16.png', 'http://lome.com'),
(35, 'fullstack nanodegree', 'znimed@gmail.com', 'logoafi2-5d8ffb4e620f1.png', 'https://nimondo.com'),
(36, 'fullstack nanodegree', 'znimed@gmail.com', 'logoafi2-5d8ffd79734d8.png', 'http://lome.com'),
(37, 'fullstack nanodegree', 'znimed@gmail.com', 'logoafi4-5d8fff9d5226d.png', 'https://nimondo.com'),
(39, 'fullstack nanodegree', 'znimed@gmail.com', 'logoafi2-5d90022fc87d0.png', 'https://nimondo.com'),
(40, 'fullstack nanodegree', 'znimed@gmail.com', 'logoafi3-5d90044c3e18e.png', 'https://nimondo.com'),
(41, 'edem', 'loogo@logi.com', 'andela-5d94a4faaae56.png', 'http://lome.com'),
(42, 'fullstack nanodegree', 'znimed@gmail.co', 'andela-5d94aa52edbc8.png', 'http://lelo.com'),
(43, 'edem', 'edem@fir.com', 'andela-5d94af591312e.png', 'https://afiamala.com'),
(44, 'fullstack nanodegree', 'znimed@gmail.com', 'andela-5d96071a03705.png', 'https://nimondo.com'),
(45, 'fullstack nanodegree', 'znimed@gmail.com', 'andela-5d960d17a7f02.png', 'http://lelo.com');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `update_date` datetime NOT NULL,
  `token_expriry` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_8D93D649F85E0677` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `name`, `username`, `email`, `password`, `token`, `update_date`, `token_expriry`) VALUES
(1, 'edem', 'user', 'togobizhouse@gmail.com', '45f106ef4d5161e7aa38cf6c666607f25748b6ca', '259086ddddb65f16ed1eb17363f82d892efb667c', '2019-09-23 15:07:40', 1),
(2, 'edem', 'neotech', 'znimed@gmail.com', '9339f3b262e0924850b931160c3b67aceb6270dd', 'ee6d9ac05322a5b90627aae53178057406fdef7e', '2019-09-25 21:42:33', 0),
(4, 'edem', 'ezangui', 'znimed@gmail.com', '9339f3b262e0924850b931160c3b67aceb6270dd', '73e1771023ab8d997a83904d7c0144716b49b525', '2019-09-25 21:44:38', 0),
(6, 'edem', 'edem', 'znimed@gmail.com', '9339f3b262e0924850b931160c3b67aceb6270dd', 'f1ed490365dc7696c4bed9e5531543b6ce2ce44b', '2019-09-25 21:59:17', 0),
(8, 'nimondo zangui', 'kadi', 'znimed@gmail.com', '2327b6d47f5376d46f83d19f1f46efb42c64c488', '9bffb7bd4821f2c4ba5c79ceebc7c7f68cec71d7', '2019-09-25 23:13:04', 0);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `employe`
--
ALTER TABLE `employe`
  ADD CONSTRAINT `FK_F804D3B9A4AEAFEA` FOREIGN KEY (`entreprise_id`) REFERENCES `entreprise` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
