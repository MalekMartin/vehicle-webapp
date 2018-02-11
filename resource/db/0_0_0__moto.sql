-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Počítač: localhost
-- Vytvořeno: Ned 11. úno 2018, 06:47
-- Verze serveru: 5.7.16
-- Verze PHP: 5.6.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `moto`
--
CREATE DATABASE IF NOT EXISTS `moto` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `moto`;

-- --------------------------------------------------------

--
-- Struktura tabulky `buyer`
--

CREATE TABLE `buyer` (
  `id` int(11) NOT NULL,
  `vehicleId` int(11) NOT NULL,
  `company` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `zipCode` varchar(16) DEFAULT NULL,
  `phone` varchar(32) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `contactPerson` varchar(255) DEFAULT NULL,
  `notes` text,
  `date` varchar(32) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `odo` float DEFAULT NULL,
  `odo2` float DEFAULT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `title` varchar(64) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `color` varchar(6) DEFAULT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `costs`
--

CREATE TABLE `costs` (
  `id` int(11) NOT NULL,
  `vehicleId` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `note` varchar(500) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `pricePerItem` float DEFAULT NULL,
  `totalPrice` float DEFAULT NULL,
  `odo` float DEFAULT NULL,
  `odo2` float DEFAULT NULL,
  `date` varchar(32) DEFAULT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `engine`
--

CREATE TABLE `engine` (
  `id` int(11) NOT NULL,
  `vehicleId` int(11) NOT NULL,
  `displacement` float DEFAULT NULL,
  `transmission` int(11) DEFAULT NULL,
  `transmissionType` varchar(16) DEFAULT NULL,
  `power` float DEFAULT NULL,
  `engineType` varchar(32) DEFAULT NULL,
  `cylinders` int(11) DEFAULT NULL,
  `fuel` varchar(16) DEFAULT NULL,
  `engineOil` varchar(128) DEFAULT NULL,
  `fuelOil` varchar(32) DEFAULT NULL,
  `dilutionRatio` varchar(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `vehicleId` int(11) NOT NULL,
  `event` varchar(32) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `date` varchar(32) DEFAULT NULL,
  `part` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `vehicleId` int(11) NOT NULL,
  `fileName` varchar(255) DEFAULT NULL,
  `type` varchar(32) DEFAULT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `fuel`
--

CREATE TABLE `fuel` (
  `id` int(11) NOT NULL,
  `date` varchar(32) DEFAULT NULL,
  `quantity` float DEFAULT NULL,
  `pricePerLiter` float DEFAULT NULL,
  `price` float DEFAULT NULL,
  `odo` float DEFAULT NULL,
  `odo2` float DEFAULT NULL,
  `fullTank` tinyint(1) DEFAULT '0',
  `note` varchar(255) DEFAULT NULL,
  `vehicleId` int(11) DEFAULT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `garage`
--

CREATE TABLE `garage` (
  `id` int(11) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(64) DEFAULT NULL,
  `zipCode` varchar(16) DEFAULT NULL,
  `web` varchar(127) DEFAULT NULL,
  `phone` varchar(32) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `intervals`
--

CREATE TABLE `intervals` (
  `id` int(11) NOT NULL,
  `vehicleId` int(11) NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  `odo` float DEFAULT NULL,
  `odo2` float DEFAULT NULL,
  `months` int(11) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `maintenance`
--

CREATE TABLE `maintenance` (
  `id` int(11) NOT NULL,
  `vehicleId` int(11) NOT NULL,
  `intervalId` int(11) DEFAULT NULL,
  `odo` float DEFAULT NULL,
  `odo2` float DEFAULT NULL,
  `date` varchar(32) DEFAULT NULL,
  `odoDone` int(11) DEFAULT NULL,
  `odo2Done` int(11) DEFAULT NULL,
  `dateDone` varchar(32) DEFAULT NULL,
  `notes` varchar(512) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `garageId` int(11) DEFAULT NULL,
  `repairId` int(11) DEFAULT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `repair`
--

CREATE TABLE `repair` (
  `id` int(11) NOT NULL,
  `vehicleId` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `odo` float DEFAULT NULL,
  `odo2` float DEFAULT NULL,
  `date` varchar(32) DEFAULT NULL,
  `garageId` int(11) DEFAULT NULL,
  `totalPrice` int(11) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `maintenanceId` int(11) DEFAULT NULL,
  `tax` int(11) DEFAULT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `repair_rating`
--

CREATE TABLE `repair_rating` (
  `id` int(11) NOT NULL,
  `repairId` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `repair_task`
--

CREATE TABLE `repair_task` (
  `id` int(11) NOT NULL,
  `repairId` int(11) DEFAULT NULL,
  `title` varchar(128) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `quantity` float DEFAULT NULL,
  `priceNoTax` float DEFAULT NULL,
  `price` float DEFAULT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `seller`
--

CREATE TABLE `seller` (
  `id` int(11) NOT NULL,
  `vehicleId` int(11) NOT NULL,
  `company` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `zipCode` varchar(16) DEFAULT NULL,
  `phone` varchar(32) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `contactPerson` varchar(255) DEFAULT NULL,
  `notes` text,
  `date` varchar(32) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `odo` float DEFAULT NULL,
  `odo2` float DEFAULT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `station`
--

CREATE TABLE `station` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `zipCode` varchar(32) DEFAULT NULL,
  `phone` varchar(32) DEFAULT NULL,
  `web` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `technical_inspection`
--

CREATE TABLE `technical_inspection` (
  `id` int(11) NOT NULL,
  `vehicleId` int(11) DEFAULT NULL,
  `date` varchar(32) DEFAULT NULL,
  `expirationDate` varchar(32) NOT NULL,
  `repeated` tinyint(1) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `stationId` int(11) DEFAULT NULL,
  `odo` float DEFAULT NULL,
  `odo2` float DEFAULT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `tires`
--

CREATE TABLE `tires` (
  `id` int(11) NOT NULL,
  `vehicleId` int(11) NOT NULL,
  `dot` varchar(32) DEFAULT NULL,
  `purchaseDate` varchar(32) DEFAULT NULL,
  `description` varchar(64) DEFAULT NULL,
  `status` varchar(32) DEFAULT NULL,
  `brand` varchar(64) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `dimensions` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `priceEach` float DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `totalPrice` float DEFAULT NULL,
  `odo` float DEFAULT NULL,
  `odo2` float DEFAULT NULL,
  `tireOdo` float DEFAULT NULL,
  `tireOdo2` float DEFAULT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `tire_change`
--

CREATE TABLE `tire_change` (
  `id` int(11) NOT NULL,
  `tireId` int(11) NOT NULL,
  `date` varchar(32) DEFAULT NULL,
  `odo` float DEFAULT NULL,
  `odo2` float DEFAULT NULL,
  `status` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `tire_properties`
--

CREATE TABLE `tire_properties` (
  `id` int(11) NOT NULL,
  `vehicleId` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `tooltip` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `firstName` varchar(32) DEFAULT NULL,
  `lastName` varchar(32) DEFAULT NULL,
  `jwt` varchar(255) DEFAULT NULL,
  `pw_hash` varchar(32) DEFAULT NULL,
  `activationCode` varchar(32) DEFAULT NULL,
  `codeExpiration` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `brand` varchar(32) NOT NULL,
  `model` varchar(32) NOT NULL,
  `manufactureYear` int(4) NOT NULL,
  `spz` varchar(16) DEFAULT NULL,
  `previousOwners` int(11) DEFAULT NULL,
  `type` varchar(32) DEFAULT NULL,
  `notes` text,
  `odo` float DEFAULT NULL,
  `odo2` float DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `units` varchar(5) DEFAULT NULL,
  `subUnits` varchar(5) DEFAULT NULL,
  `tankCapacity` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struktura tabulky `vehicle_settings`
--

CREATE TABLE `vehicle_settings` (
  `id` int(11) NOT NULL,
  `vehicleId` int(11) NOT NULL,
  `mileageBefore` float NOT NULL,
  `enginHoursBefore` int(11) NOT NULL,
  `monthBefore` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Klíče pro exportované tabulky
--

--
-- Klíče pro tabulku `buyer`
--
ALTER TABLE `buyer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicleId` (`vehicleId`);

--
-- Klíče pro tabulku `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `title` (`title`);

--
-- Klíče pro tabulku `costs`
--
ALTER TABLE `costs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicleId` (`vehicleId`),
  ADD KEY `category` (`category`);

--
-- Klíče pro tabulku `engine`
--
ALTER TABLE `engine`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicleId` (`vehicleId`);

--
-- Klíče pro tabulku `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicleId` (`vehicleId`);

--
-- Klíče pro tabulku `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicleId` (`vehicleId`);

--
-- Klíče pro tabulku `fuel`
--
ALTER TABLE `fuel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicle_id` (`vehicleId`),
  ADD KEY `vehicleId` (`vehicleId`);

--
-- Klíče pro tabulku `garage`
--
ALTER TABLE `garage`
  ADD PRIMARY KEY (`id`);

--
-- Klíče pro tabulku `intervals`
--
ALTER TABLE `intervals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicleId` (`vehicleId`);

--
-- Klíče pro tabulku `maintenance`
--
ALTER TABLE `maintenance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicleId` (`vehicleId`),
  ADD KEY `intervalId` (`intervalId`),
  ADD KEY `garageId` (`garageId`),
  ADD KEY `repairId` (`repairId`);

--
-- Klíče pro tabulku `repair`
--
ALTER TABLE `repair`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicleId` (`vehicleId`),
  ADD KEY `garageId` (`garageId`),
  ADD KEY `maintenanceId` (`maintenanceId`);

--
-- Klíče pro tabulku `repair_rating`
--
ALTER TABLE `repair_rating`
  ADD PRIMARY KEY (`id`),
  ADD KEY `repairId` (`repairId`);

--
-- Klíče pro tabulku `repair_task`
--
ALTER TABLE `repair_task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `repairId` (`repairId`);

--
-- Klíče pro tabulku `seller`
--
ALTER TABLE `seller`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicleId` (`vehicleId`);

--
-- Klíče pro tabulku `station`
--
ALTER TABLE `station`
  ADD PRIMARY KEY (`id`);

--
-- Klíče pro tabulku `technical_inspection`
--
ALTER TABLE `technical_inspection`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicleId` (`vehicleId`),
  ADD KEY `stationId` (`stationId`);

--
-- Klíče pro tabulku `tires`
--
ALTER TABLE `tires`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicleId` (`vehicleId`);

--
-- Klíče pro tabulku `tire_change`
--
ALTER TABLE `tire_change`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tireId` (`tireId`);

--
-- Klíče pro tabulku `tire_properties`
--
ALTER TABLE `tire_properties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicleId` (`vehicleId`);

--
-- Klíče pro tabulku `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Klíče pro tabulku `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Klíče pro tabulku `vehicle_settings`
--
ALTER TABLE `vehicle_settings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicleId` (`vehicleId`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `buyer`
--
ALTER TABLE `buyer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT pro tabulku `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT pro tabulku `costs`
--
ALTER TABLE `costs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;
--
-- AUTO_INCREMENT pro tabulku `engine`
--
ALTER TABLE `engine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT pro tabulku `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
--
-- AUTO_INCREMENT pro tabulku `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT pro tabulku `fuel`
--
ALTER TABLE `fuel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=183;
--
-- AUTO_INCREMENT pro tabulku `garage`
--
ALTER TABLE `garage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT pro tabulku `intervals`
--
ALTER TABLE `intervals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT pro tabulku `maintenance`
--
ALTER TABLE `maintenance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;
--
-- AUTO_INCREMENT pro tabulku `repair`
--
ALTER TABLE `repair`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;
--
-- AUTO_INCREMENT pro tabulku `repair_rating`
--
ALTER TABLE `repair_rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pro tabulku `repair_task`
--
ALTER TABLE `repair_task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;
--
-- AUTO_INCREMENT pro tabulku `seller`
--
ALTER TABLE `seller`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT pro tabulku `station`
--
ALTER TABLE `station`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pro tabulku `technical_inspection`
--
ALTER TABLE `technical_inspection`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT pro tabulku `tires`
--
ALTER TABLE `tires`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT pro tabulku `tire_change`
--
ALTER TABLE `tire_change`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT pro tabulku `tire_properties`
--
ALTER TABLE `tire_properties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pro tabulku `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pro tabulku `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT pro tabulku `vehicle_settings`
--
ALTER TABLE `vehicle_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `buyer`
--
ALTER TABLE `buyer`
  ADD CONSTRAINT `buyer_ibfk_1` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Omezení pro tabulku `costs`
--
ALTER TABLE `costs`
  ADD CONSTRAINT `costs_ibfk_1` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `costs_ibfk_2` FOREIGN KEY (`category`) REFERENCES `category` (`id`);

--
-- Omezení pro tabulku `engine`
--
ALTER TABLE `engine`
  ADD CONSTRAINT `engine_ibfk_1` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Omezení pro tabulku `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Omezení pro tabulku `files`
--
ALTER TABLE `files`
  ADD CONSTRAINT `files_ibfk_1` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Omezení pro tabulku `fuel`
--
ALTER TABLE `fuel`
  ADD CONSTRAINT `fuel_ibfk_1` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Omezení pro tabulku `intervals`
--
ALTER TABLE `intervals`
  ADD CONSTRAINT `intervals_ibfk_1` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Omezení pro tabulku `maintenance`
--
ALTER TABLE `maintenance`
  ADD CONSTRAINT `maintenance_ibfk_1` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `maintenance_ibfk_3` FOREIGN KEY (`repairId`) REFERENCES `repair` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `maintenance_ibfk_4` FOREIGN KEY (`intervalId`) REFERENCES `intervals` (`id`);

--
-- Omezení pro tabulku `repair`
--
ALTER TABLE `repair`
  ADD CONSTRAINT `repair_ibfk_1` FOREIGN KEY (`garageId`) REFERENCES `garage` (`id`),
  ADD CONSTRAINT `repair_ibfk_2` FOREIGN KEY (`maintenanceId`) REFERENCES `maintenance` (`id`);

--
-- Omezení pro tabulku `repair_rating`
--
ALTER TABLE `repair_rating`
  ADD CONSTRAINT `repair_rating_ibfk_1` FOREIGN KEY (`repairId`) REFERENCES `repair` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Omezení pro tabulku `repair_task`
--
ALTER TABLE `repair_task`
  ADD CONSTRAINT `repair_task_ibfk_1` FOREIGN KEY (`repairId`) REFERENCES `repair` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Omezení pro tabulku `seller`
--
ALTER TABLE `seller`
  ADD CONSTRAINT `seller_ibfk_1` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Omezení pro tabulku `technical_inspection`
--
ALTER TABLE `technical_inspection`
  ADD CONSTRAINT `technical_inspection_ibfk_1` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `technical_inspection_ibfk_2` FOREIGN KEY (`stationId`) REFERENCES `station` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Omezení pro tabulku `tires`
--
ALTER TABLE `tires`
  ADD CONSTRAINT `tires_ibfk_1` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Omezení pro tabulku `tire_change`
--
ALTER TABLE `tire_change`
  ADD CONSTRAINT `tire_change_ibfk_1` FOREIGN KEY (`tireId`) REFERENCES `tires` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Omezení pro tabulku `tire_properties`
--
ALTER TABLE `tire_properties`
  ADD CONSTRAINT `tire_properties_ibfk_1` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Omezení pro tabulku `vehicle_settings`
--
ALTER TABLE `vehicle_settings`
  ADD CONSTRAINT `vehicle_settings_ibfk_1` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
