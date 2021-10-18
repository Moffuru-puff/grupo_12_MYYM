
DROP DATABASE IF EXISTS myymGamers;
CREATE DATABASE myymGamers;
USE myymGamers;

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `user` VARCHAR(8) NOT NULL,
   `name` VARCHAR(16),
   `lastName` VARCHAR(25),
   `telephone` INT,
   `email` VARCHAR(100) NOT NULL,
   `password` VARCHAR(100) NOT NULL,
   `avatar` VARCHAR(200) NOT NULL,
   `favoritesId` INT(5) NOT NULL,
   `rolesId` TINYINT NOT NULL,
   `addressesId` INT,
   `cartId` INT NOT NULL,
   `creditCardsId` INT,
   `createdAt` timestamp NULL DEFAULT NULL,
   `updatedAt` timestamp NULL DEFAULT NULL,
   PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `Roles`;
CREATE TABLE `Roles` (
   `id` TINYINT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   `createdAt` timestamp NULL DEFAULT NULL,
   `updatedAt` timestamp NULL DEFAULT NULL,
   PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `Products`;
CREATE TABLE `Products` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100),
   `mainFeatures` VARCHAR(255) NOT NULL,
   `price` FLOAT NOT NULL,
   `discount` INT,
   `barcode` INT NOT NULL,
   `stock` INT,
   `description` VARCHAR(255),
   `imagesId` INT NOT NULL,
   `subcategoryId` INT NOT NULL,
   `createdAt` timestamp NULL DEFAULT NULL,
   `updatedAt` timestamp NULL DEFAULT NULL,
   PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `Favorites`;
CREATE TABLE `Favorites` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `userId` INT NOT NULL,
   `productId` INT NOT NULL,
   `createdAt` timestamp NULL DEFAULT NULL,
   `updatedAt` timestamp NULL DEFAULT NULL,
   PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `Addresses`;
CREATE TABLE `Addresses` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `address` VARCHAR(100),
   `state` VARCHAR(100),
   `city` VARCHAR(255),
   `country` VARCHAR(255),
   `postalCode` INT NOT NULL,
   `createdAt` timestamp NULL DEFAULT NULL,
   `updatedAt` timestamp NULL DEFAULT NULL,
   PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `Order`;
CREATE TABLE `Order` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `numberOrder` INT NOT NULL,
   `createdAt` timestamp NULL DEFAULT NULL,
   `updatedAt` timestamp NULL DEFAULT NULL,
   PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `Cart`;
CREATE TABLE `Cart` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `userId` INT NOT NULL,
   `itemsId` INT,
   `total` FLOAT,
   `totalItems` INT,
   `createdAt` timestamp NULL DEFAULT NULL,
   `updatedAt` timestamp NULL DEFAULT NULL,
   PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `Items`;
CREATE TABLE `Items` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `productId` INT NOT NULL,
   `quantity` INT NOT NULL,
   `price` FLOAT NOT NULL,
   `total` FLOAT,
   `subtotal` FLOAT,
   `discount` INT,
   `name` VARCHAR(100),
   `barcode` INT NOT NULL,
   `createdAt` timestamp NULL DEFAULT NULL,
   `updatedAt` timestamp NULL DEFAULT NULL,
   PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `ProductsImages`;
CREATE TABLE `ProductsImages` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `url` VARCHAR(200) NOT NULL,
   `productId` INT NOT NULL,
   `createdAt` timestamp NULL DEFAULT NULL,
   `updatedAt` timestamp NULL DEFAULT NULL,
   PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `Categories`;
CREATE TABLE `Categories` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   `createdAt` timestamp NULL DEFAULT NULL,
   `updatedAt` timestamp NULL DEFAULT NULL,
   PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `Subcategory`;
CREATE TABLE `Subcategories` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   `categoryId` INT NOT NULL,
   `createdAt` timestamp NULL DEFAULT NULL,
   `updatedAt` timestamp NULL DEFAULT NULL,
   PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `Marks`;
CREATE TABLE `Marks` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   `createdAt` timestamp NULL DEFAULT NULL,
   `updatedAt` timestamp NULL DEFAULT NULL,
   PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `BranchOffices`;
CREATE TABLE `BranchOffices` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `addressId` INT NOT NULL,
   `schedule` VARCHAR(255),
   `telephone` INT,
   `description` VARCHAR(255),
   `createdAt` timestamp NULL DEFAULT NULL,
   `updatedAt` timestamp NULL DEFAULT NULL,
   PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `Banners`;
CREATE TABLE `Banners` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `urlImage` VARCHAR(100) NOT NULL,
   `createdAt` timestamp NULL DEFAULT NULL,
   `updatedAt` timestamp NULL DEFAULT NULL,
   PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `CreditCards`;
CREATE TABLE `CreditCards` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `numberCard` INT NOT NULL,
   `key` INT NOT NULL,
   `nameCard` VARCHAR(100) NOT NULL,
   `bank` VARCHAR(50) NOT NULL,
   `userId` INT NOT NULL,
   `createdAt` timestamp NULL DEFAULT NULL,
   `updatedAt` timestamp NULL DEFAULT NULL,
   PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `valorationProduct`;
CREATE TABLE `valorationProduct` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `opinions` VARCHAR(255),
   `score` FLOAT NOT NULL,
   `userId` INT NOT NULL,
   `productId` INT NOT NULL,
   `createdAt` timestamp NULL DEFAULT NULL,
   `updatedAt` timestamp NULL DEFAULT NULL,
   PRIMARY KEY (`id`)
);


ALTER TABLE `Users` ADD CONSTRAINT `FK_a564e5c4-cde7-438c-8f27-be668256db4a` FOREIGN KEY (`favoritesId`) REFERENCES `Favorites`(`id`);

ALTER TABLE `Users` ADD CONSTRAINT `FK_3f38ccf4-7245-4c22-a0c5-3f04b3683994` FOREIGN KEY (`addressesId`) REFERENCES `Addresses`(`id`);

ALTER TABLE `Users` ADD CONSTRAINT `FK_4432b4c0-2c91-4541-b581-0d6b6e73edce` FOREIGN KEY (`rolesId`) REFERENCES `Roles`(`id`);

ALTER TABLE `Users` ADD CONSTRAINT `FK_aef595e9-96b7-48dc-be82-6de9a9002c3e` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`);

ALTER TABLE `Users` ADD CONSTRAINT `FK_4d065e4a-ea49-4e4f-aaad-cc51088b15c3` FOREIGN KEY (`creditCardsId`) REFERENCES `CreditCards`(`id`);

ALTER TABLE `Products` ADD CONSTRAINT `FK_04bbe5b1-cd75-4de8-a7e5-e29cf0940332` FOREIGN KEY (`imagesId`) REFERENCES `ProductsImages`(`id`);

ALTER TABLE `Products` ADD CONSTRAINT `FK_2ca8e1a1-379b-4285-9b27-26917de9b144` FOREIGN KEY (`subcategoryId`) REFERENCES `Subcategories`(`id`);

ALTER TABLE `Subcategories` ADD CONSTRAINT `FK_2a2f3254-54f0-45ba-852c-900215c20288` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`);

ALTER TABLE `Products` ADD CONSTRAINT `FK_d8253084-fbd9-4269-a316-505498ad6d57` FOREIGN KEY (`markId`) REFERENCES `Marks`(`id`);

ALTER TABLE `Products` ADD CONSTRAINT `FK_903d101b-4bf1-47dd-8fbf-ad03b54be8e9` FOREIGN KEY (`valorationsId`) REFERENCES `valorationProduct`(`id`);

ALTER TABLE `Favorites` ADD CONSTRAINT `FK_3651b842-0ea4-48db-bc14-5ecc323b49fc` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`);

ALTER TABLE `Favorites` ADD CONSTRAINT `FK_586407bc-e56d-485c-a088-6df250c6529e` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`);

ALTER TABLE `Cart` ADD CONSTRAINT `FK_e60f5dcd-c4c6-4d73-80c8-ed02cf9ef7f4` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`);

ALTER TABLE `Cart` ADD CONSTRAINT `FK_aa487105-2bd5-4622-ba32-1a784f776fad` FOREIGN KEY (`itemsId`) REFERENCES `Items`(`id`);

ALTER TABLE `Items` ADD CONSTRAINT `FK_6b160d5b-5e08-46ac-bdd0-dffd0e15ed3c` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`);

ALTER TABLE `ProductsImages` ADD CONSTRAINT `FK_34ec83fb-f7bd-436b-a95d-9de5f91603d1` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`);

ALTER TABLE `BranchOffices` ADD CONSTRAINT `FK_ff709677-84f1-4874-b620-3ff55802f36f` FOREIGN KEY (`addressId`) REFERENCES `Addresses`(`id`);

ALTER TABLE `CreditCards` ADD CONSTRAINT `FK_d76acb4e-fd49-4d31-9d11-42fb4537ee2d` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`);

ALTER TABLE `valorationProduct` ADD CONSTRAINT `FK_4c2b265a-12f2-458b-b642-d54883da0736` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`);

ALTER TABLE `valorationProduct` ADD CONSTRAINT `FK_1c7ddcb3-a662-40d6-a1d7-2bb94e635033` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`);
