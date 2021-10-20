DROP DATABASE IF EXISTS myymGamers;
CREATE DATABASE myymGamers;
USE myymGamers;

-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: myymgamers
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.21-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `postalCode` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `banners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `urlImage` varchar(100) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners`
--

LOCK TABLES `banners` WRITE;
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branchoffices`
--

DROP TABLE IF EXISTS `branchoffices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `branchoffices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `addressId` int(11) NOT NULL,
  `schedule` varchar(255) DEFAULT NULL,
  `telephone` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ff709677-84f1-4874-b620-3ff55802f36f` (`addressId`),
  CONSTRAINT `FK_ff709677-84f1-4874-b620-3ff55802f36f` FOREIGN KEY (`addressId`) REFERENCES `addresses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branchoffices`
--

LOCK TABLES `branchoffices` WRITE;
/*!40000 ALTER TABLE `branchoffices` DISABLE KEYS */;
/*!40000 ALTER TABLE `branchoffices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `itemsId` int(11) DEFAULT NULL,
  `total` float DEFAULT NULL,
  `totalItems` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e60f5dcd-c4c6-4d73-80c8-ed02cf9ef7f4` (`userId`),
  KEY `FK_aa487105-2bd5-4622-ba32-1a784f776fad` (`itemsId`),
  CONSTRAINT `FK_aa487105-2bd5-4622-ba32-1a784f776fad` FOREIGN KEY (`itemsId`) REFERENCES `items` (`id`),
  CONSTRAINT `FK_e60f5dcd-c4c6-4d73-80c8-ed02cf9ef7f4` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Consolas',NULL,NULL),(2,'Videojuegos',NULL,NULL),(3,'Accesorios',NULL,NULL),(4,'Zona Retro',NULL,NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `creditcards`
--

DROP TABLE IF EXISTS `creditcards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `creditcards` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numberCard` int(11) NOT NULL,
  `key` int(11) NOT NULL,
  `nameCard` varchar(100) NOT NULL,
  `bank` varchar(50) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_d76acb4e-fd49-4d31-9d11-42fb4537ee2d` (`userId`),
  CONSTRAINT `FK_d76acb4e-fd49-4d31-9d11-42fb4537ee2d` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `creditcards`
--

LOCK TABLES `creditcards` WRITE;
/*!40000 ALTER TABLE `creditcards` DISABLE KEYS */;
/*!40000 ALTER TABLE `creditcards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `favorites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3651b842-0ea4-48db-bc14-5ecc323b49fc` (`productId`),
  KEY `FK_586407bc-e56d-485c-a088-6df250c6529e` (`userId`),
  CONSTRAINT `FK_3651b842-0ea4-48db-bc14-5ecc323b49fc` FOREIGN KEY (`productId`) REFERENCES `products` (`id`),
  CONSTRAINT `FK_586407bc-e56d-485c-a088-6df250c6529e` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (20,1,25,'2021-10-17 03:43:55','2021-10-17 03:43:55');
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` float NOT NULL,
  `total` float DEFAULT NULL,
  `subtotal` float DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `barcode` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_6b160d5b-5e08-46ac-bdd0-dffd0e15ed3c` (`productId`),
  CONSTRAINT `FK_6b160d5b-5e08-46ac-bdd0-dffd0e15ed3c` FOREIGN KEY (`productId`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marks`
--

DROP TABLE IF EXISTS `marks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marks`
--

LOCK TABLES `marks` WRITE;
/*!40000 ALTER TABLE `marks` DISABLE KEYS */;
INSERT INTO `marks` VALUES (1,'Intel',NULL,NULL),(2,'Play Station',NULL,NULL),(3,'X-Box',NULL,NULL),(4,'Sega',NULL,NULL),(5,'Amd Ryzer',NULL,NULL),(6,'Nintendo',NULL,NULL),(7,'Kanji',NULL,NULL),(8,'Kingston',NULL,NULL),(9,'GameBoy',NULL,NULL);
/*!40000 ALTER TABLE `marks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numberOrder` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `mainFeatures` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `barcode` int(11) NOT NULL,
  `stock` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `subcategoryId` int(11) NOT NULL,
  `markId` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_2ca8e1a1-379b-4285-9b27-26917de9b144` (`subcategoryId`),
  KEY `FK_d8253084-fbd9-4269-a316-505498ad6d57` (`markId`),
  CONSTRAINT `FK_2ca8e1a1-379b-4285-9b27-26917de9b144` FOREIGN KEY (`subcategoryId`) REFERENCES `subcategories` (`id`),
  CONSTRAINT `FK_d8253084-fbd9-4269-a316-505498ad6d57` FOREIGN KEY (`markId`) REFERENCES `marks` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Play Station 1','Consola Original',40000,10,1,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(2,'Play Station 2','Consola Original',20000,0,2,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(3,'Play Station 3','Consola Original, Un año de garantia',25000,0,3,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(4,'Notebook','Notebook con 1tb de memoria y 8gb de memoria ram',150000,15,0,12,'zsdgfsgv v',2,1,'2021-10-15 00:51:15','2021-10-15 00:51:15'),(5,'X-Box One','X-BOX 360 juego Original',150000,15,451,20,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,'2021-10-15 01:00:59','2021-10-15 01:00:59'),(6,'Nintendo 64','Funcionando perfecto',80000,0,6,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(7,'Nintendo Wii','1 Año de garantia',30000,0,7,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(8,'Nintendo Nes','Consola retro nueva',20000,5,8,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(9,'CPU Gamer Cyber Power Gamer','La mas rapida del mercado',50000,15,9,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(10,'Gameboy Color','Consola portatil retro',4000,10,10,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(11,'Gabinete Golden Field 5300','Gabinete 5300 original',10000,10,11,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(12,'Kit Gamer','Teclado + Auriculares con microfono + Accesorios',8000,10,12,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(13,'Microfono Kingston','microfono condensador ',6000,15,13,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(14,'Mini Arcade','mini arcade con 200 juegos clasicos',3500,5,14,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(16,'Nintendo Game Cube','Nintendo Cube original Retro',45000,0,16,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(17,'Mini Sega','Mini consola con 200 juegos clasicos de SEGA',10000,0,17,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(18,'Consola Sega Genesis','Consola Sega original completa',20000,15,18,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(19,'Sosting Arcade','Sosting Arcade Original retro',10000,10,19,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(20,'Play Station Vita','Mini Play Station portatil',50000,0,20,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(21,'Computadora Custom Built','MICRO PROCESADOR INTEL CORE I5 9400',180000,10,21,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(22,'Computadora Customize Novus','MICRO PROCESADOR INTEL CORE I5 9400',200000,10,22,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(23,'Computadora Customize Verde','MICRO PROCESADOR INTEL CORE I5 9400',200000,15,23,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(24,'Computadora Gamer Amd Ryzer','MICRO PROCESADOR INTEL CORE I5 9400',200000,15,24,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(25,'Computadora Customize Azul','MICRO PROCESADOR INTEL CORE I5 9400',180000,15,25,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(26,'Crash Bandicoot','Play Satiton 1,juego Original',200,5,26,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(27,'Rayman','Play Satiton 1,juego Original',200,5,27,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(28,'Small Soldiers','Play Satiton 1,juego Original',200,10,28,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(29,'Super Mario World','Play Satiton 1,juego Original',200,10,29,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(30,'Syphon Filter','Play Satiton 1,juego Original',250,10,30,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(31,'The Simpsons Wrestling','Play Satiton 1,juego Original',200,15,31,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(32,'Crash Nitro Kart','Play Satiton 2,juego Original',250,10,32,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(33,'Drakengard','Play Satiton 2,juego Original',250,10,33,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(34,'Driven','Play Satiton 2,juego Original',250,10,34,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(35,'Madagascar','Play Satiton 2,juego Original',250,10,35,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(36,'Silent Hill 4','Play Satiton 2,juego Original',250,10,36,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(37,'Sonic Unleashed','Play Satiton 2,juego Original',250,10,37,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(38,'Tekken 5','Play Satiton 2,juego Original',250,10,38,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(39,'Armored Core','Play Satiton 3,juego Original',250,10,39,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(40,'Bound By Flame','Play Satiton 3,juego Original',250,5,40,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(41,'Grand Theft Auto','Play Satiton 3,juego Original',300,5,41,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(42,'Little Big Planet','Play Satiton 3,juego Original',300,5,42,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(43,'Minecraft','Play Satiton 3,juego Original',300,5,43,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(44,'Resident Evil','Play Satiton 3,juego Original',250,5,44,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(45,'Transformers','Play Satiton 3,juego Original',250,5,45,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(46,'Fimbul','Play Satiton 4,juego Original',1000,15,46,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(47,'Helldivers','Play Satiton 4,juego Original',1000,15,47,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(48,'Just Dance 2021','Play Satiton 4,juego Original',1000,15,48,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(49,'Mafia','Play Satiton 4,juego Original',1000,15,49,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(50,'MediEvil','Play Satiton 4,juego Original',1000,15,50,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(51,'Police Chase','Play Satiton 4,juego Original',1000,15,51,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(52,'Resident Evil','Play Satiton 4,juego Original',1000,15,52,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(53,'Destruction Allstars','Play Satiton 5,juego Original',1500,15,53,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(54,'Ghost','Play Satiton 5,juego Original',1500,15,54,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(55,'Godfall','Play Satiton 5,juego Original',1500,15,55,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(56,'Just Dance 2021','Play Satiton 5,juego Original',1500,15,56,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(57,'Spider Man','Play Satiton 5,juego Original',1500,15,57,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(58,'Dirt 5','Play Satiton 5,juego Original',1500,15,58,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(59,'3 juegos Sega clasicos','Sega Juegos Retro,juego Original',1500,15,59,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(60,'Grind Stormer','SEGA juego retro, Original',1500,15,60,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(61,'Juegos Clasicos','SEGA juego retro, Original',1500,15,61,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(62,'X-Men','SEGA juego retro, Original',1500,15,62,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(63,'Batman','X-BOX 360 juego Original',3500,15,63,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(64,'Borderlands 2','X-BOX 360 juego Original',3500,15,64,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(65,'Destiny','X-BOX ONE juego Original',3500,15,65,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(66,'Dirt Rally','X-BOX ONE juego Original',3500,15,66,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(67,'Fortnite','X-BOX ONE juego Original',3500,15,67,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(68,'Forza Horizon','X-BOX ONE juego Original',3500,15,68,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(69,'Heist','X-BOX 360 juego Original',3500,15,69,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(70,'Just Dance','X-BOX 360 juego Original',3500,15,70,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(71,'Lego Marvel','X-BOX ONE,juego Original',3500,15,71,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(72,'Minecraft','X-BOX ONE juego Original',3500,15,72,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(73,'Ride','X-BOX ONE, juego Original',3500,15,73,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL),(74,'SSX 360','X-BOX 360 juego Original',3500,15,74,10,'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto facilis veritatis nobis temporibus, obcaecati cupiditate, magnam quis nisi modi quos consectetur optio labore numquam ipsa repudiandae, quaerat quia. Aliquam sint quae iusto minima voluptatum,',2,1,NULL,NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productsimages`
--

DROP TABLE IF EXISTS `productsimages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productsimages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(200) NOT NULL,
  `productId` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_34ec83fb-f7bd-436b-a95d-9de5f91603d1` (`productId`),
  CONSTRAINT `FK_34ec83fb-f7bd-436b-a95d-9de5f91603d1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productsimages`
--

LOCK TABLES `productsimages` WRITE;
/*!40000 ALTER TABLE `productsimages` DISABLE KEYS */;
INSERT INTO `productsimages` VALUES (1,'',4,'2021-10-15 00:51:15','2021-10-15 00:51:15'),(2,'1634259659087_img_.png',5,'2021-10-15 01:00:59','2021-10-15 01:00:59'),(3,'PS1.png',1,NULL,NULL),(4,'PS2.jpg',2,NULL,NULL),(5,'play3.jpg',3,NULL,NULL),(6,'Nintendo64.jpg',6,NULL,NULL),(7,'wiiConsola.png',7,NULL,NULL),(8,'nes-console.png',8,NULL,NULL),(9,'CyberpowerGamer.jpg',9,NULL,NULL),(10,'gameboycolor.png',10,NULL,NULL),(11,'goldenField5300.jpg',11,NULL,NULL),(12,'kitGamerMFTEK.png',12,NULL,NULL),(13,'microNegro.jpg',13,NULL,NULL),(14,'miniArcade.png',14,NULL,NULL),(15,'Nintendo-Gamecube-Console.png',16,NULL,NULL),(16,'Sega-mini.png',17,NULL,NULL),(17,'segaGenesis.jpg',18,NULL,NULL),(18,'sosting-arcade.png',19,NULL,NULL),(19,'PlayStationVita.png',20,NULL,NULL),(20,'custom-built-gaming-pc-1.png',21,NULL,NULL),(21,'customizeNovus.png',22,NULL,NULL),(22,'pcTransparenteVerde.png',23,NULL,NULL),(23,'gaming-computer-HQ.png',24,NULL,NULL),(24,'computadoraAzul.png',25,NULL,NULL),(25,'crashBandicoot-play1.png',26,NULL,NULL),(26,'rayman-play1.jpg',27,NULL,NULL),(27,'smallSoldiers-play1.jpg',28,NULL,NULL),(28,'superMarioWorld-play1.jpg',29,NULL,NULL),(29,'syphonFilter-play1.jpg',30,NULL,NULL),(30,'theSimpsons-play1.jpg',31,NULL,NULL),(31,'Crash_Nitro_Kart-play2.jpg',32,NULL,NULL),(32,'drakengard.jpg',33,NULL,NULL),(33,'driven-play2.jpg',34,NULL,NULL),(34,'madagascar-play2.jpg',35,NULL,NULL),(35,'silentHill4-play2.jpg',36,NULL,NULL),(36,'sonicUnleashed-play2.jpg',37,NULL,NULL),(37,'tekken5-play2.jpg',38,NULL,NULL),(38,'armoredCore-play3.jpg',39,NULL,NULL),(39,'boundByFlame-play3.jpg',40,NULL,NULL),(40,'grandTheftAuto-play3.jpg',41,NULL,NULL),(41,'littleBigPlanet-play3.jpg',42,NULL,NULL),(42,'minecraft-play3.jpg',43,NULL,NULL),(43,'residentEvil-play3.jpg',44,NULL,NULL),(44,'transformers-play3.jpg',45,NULL,NULL),(45,'fimbul-play4.jpg',46,NULL,NULL),(46,'helldivers-play4.jpg',47,NULL,NULL),(47,'justDance2021-play4.jpg',48,NULL,NULL),(48,'mafia-play4.jpg',49,NULL,NULL),(49,'medievil-play4.jpg',50,NULL,NULL),(50,'policeChase-play4.jpg',51,NULL,NULL),(51,'residentEvil-play4.jpg',52,NULL,NULL),(52,'Destruction-Allstars-play5.png',53,NULL,NULL),(53,'ghost-play5.jpg',54,NULL,NULL),(54,'godfall-play5.jpg',55,NULL,NULL),(55,'justDance-play5.png',56,NULL,NULL),(56,'spider-man-play5.jpg',57,NULL,NULL),(57,'dirt5-play5.jpg',58,NULL,NULL),(58,'3juegos-sega.png',59,NULL,NULL),(59,'grindStormer-sega.jpg',60,NULL,NULL),(60,'juegosClasicos-Sega.jpg',61,NULL,NULL),(61,'xMen-sega.jpg',62,NULL,NULL),(62,'batman-xbox360.jpg',63,NULL,NULL),(63,'borderlands2-xbox360.jpg',64,NULL,NULL),(64,'destiny-xboxOne.jpg',65,NULL,NULL),(65,'DirtRally-xboxOne.jpg',66,NULL,NULL),(66,'fortnite-xboxOne.jpg',67,NULL,NULL),(67,'forzaHorizon-xboxOne.jpg',68,NULL,NULL),(68,'heist-xbox360.jpg',69,NULL,NULL),(69,'justDance360.png',70,NULL,NULL),(70,'legoMarvel-xbox.jpg',71,NULL,NULL),(71,'minecraft-xboxOne.jpg',72,NULL,NULL),(72,'ride-xboxOne.jpg',73,NULL,NULL),(73,'ssx-xbox360.jpg',74,NULL,NULL);
/*!40000 ALTER TABLE `productsimages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'User',NULL,NULL),(2,'Admin',NULL,NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_2a2f3254-54f0-45ba-852c-900215c20288` (`categoryId`),
  CONSTRAINT `FK_2a2f3254-54f0-45ba-852c-900215c20288` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (1,'Acción',2,NULL,NULL),(2,'Familiar',2,NULL,NULL),(3,'Retro',4,NULL,NULL);
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(8) NOT NULL,
  `name` varchar(16) DEFAULT NULL,
  `lastName` varchar(25) DEFAULT NULL,
  `telephone` int(11) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `avatar` varchar(200) NOT NULL,
  `rolesId` tinyint(4) NOT NULL,
  `addressesId` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3f38ccf4-7245-4c22-a0c5-3f04b3683994` (`addressesId`),
  KEY `FK_4432b4c0-2c91-4541-b581-0d6b6e73edce` (`rolesId`),
  CONSTRAINT `FK_3f38ccf4-7245-4c22-a0c5-3f04b3683994` FOREIGN KEY (`addressesId`) REFERENCES `addresses` (`id`),
  CONSTRAINT `FK_4432b4c0-2c91-4541-b581-0d6b6e73edce` FOREIGN KEY (`rolesId`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Yami',NULL,NULL,NULL,'yami@gmail.com','$2a$12$lfviTvTBX9wNpbBfYANNBuY7CY8it9rMAi.JrCauk/NerpjK3lz46','defaultAvatarImage.png',2,NULL,'2021-10-16 01:02:52','2021-10-16 01:02:52'),(2,'equisde',NULL,NULL,NULL,'myym@gmail.com','$2a$12$YR6M3.8MhU8qnBk9f/BjQ.pqtaPCO.pn0nCbc2ayGqZ2nucGlLwky','defaultAvatarImage.png',1,NULL,'2021-10-18 17:38:19','2021-10-18 17:38:19');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `valorationproduct`
--

DROP TABLE IF EXISTS `valorationproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `valorationproduct` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `opinions` varchar(255) DEFAULT NULL,
  `score` float NOT NULL,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_4c2b265a-12f2-458b-b642-d54883da0736` (`productId`),
  KEY `FK_1c7ddcb3-a662-40d6-a1d7-2bb94e635033` (`userId`),
  CONSTRAINT `FK_1c7ddcb3-a662-40d6-a1d7-2bb94e635033` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_4c2b265a-12f2-458b-b642-d54883da0736` FOREIGN KEY (`productId`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `valorationproduct`
--

LOCK TABLES `valorationproduct` WRITE;
/*!40000 ALTER TABLE `valorationproduct` DISABLE KEYS */;
/*!40000 ALTER TABLE `valorationproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'myymgamers'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-18 14:46:23
