-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: resturant_db
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `Last_name` varchar(200) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `status` enum('active','on_leave','inactive') DEFAULT 'active',
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'Kingsley','Ofori-Atta','0549812843','Kingsleyoforiatta70@gmail.com',1,'active'),(2,'Kwabena','Obeng-Gyamfi','0549812843','Kwabenaobenggyamfi@gmail.com',3,'active'),(3,'Maxwell','Tandoh','0549812843','Maxwelltandoh@gmail.com',2,'active'),(4,'Nova','Rova','0549812843','Novarova@gmail.com',4,'active'),(5,'Kojo','Asante','0558888888','kojoemail.com',2,'active');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endofdayreconciliation`
--

DROP TABLE IF EXISTS `endofdayreconciliation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `endofdayreconciliation` (
  `recon_id` int NOT NULL AUTO_INCREMENT,
  `recon_date` date NOT NULL,
  `ingredients_used` decimal(10,2) DEFAULT NULL,
  `sales_value` decimal(10,2) DEFAULT NULL,
  `closing_stock_level` decimal(10,2) DEFAULT NULL,
  `notes` text,
  PRIMARY KEY (`recon_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endofdayreconciliation`
--

LOCK TABLES `endofdayreconciliation` WRITE;
/*!40000 ALTER TABLE `endofdayreconciliation` DISABLE KEYS */;
/*!40000 ALTER TABLE `endofdayreconciliation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kitchenstock`
--

DROP TABLE IF EXISTS `kitchenstock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kitchenstock` (
  `kitchen_stock_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `quantity` decimal(10,2) NOT NULL,
  `transfer_date` date NOT NULL,
  PRIMARY KEY (`kitchen_stock_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `kitchenstock_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kitchenstock`
--

LOCK TABLES `kitchenstock` WRITE;
/*!40000 ALTER TABLE `kitchenstock` DISABLE KEYS */;
/*!40000 ALTER TABLE `kitchenstock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logins`
--

DROP TABLE IF EXISTS `logins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logins` (
  `Login_ID` int NOT NULL AUTO_INCREMENT,
  `employee_id` int DEFAULT NULL,
  `Username` varchar(50) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  `logintime` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Login_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logins`
--

LOCK TABLES `logins` WRITE;
/*!40000 ALTER TABLE `logins` DISABLE KEYS */;
INSERT INTO `logins` VALUES (1,1,'Quophy2k1','5555','2025-07-15 15:44:25');
/*!40000 ALTER TABLE `logins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mealpreparationlog`
--

DROP TABLE IF EXISTS `mealpreparationlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mealpreparationlog` (
  `prep_id` int NOT NULL AUTO_INCREMENT,
  `menu_item_id` int NOT NULL,
  `quantity_prepared` int NOT NULL,
  `prep_date` date NOT NULL,
  `Employee_ID` int NOT NULL,
  PRIMARY KEY (`prep_id`),
  KEY `menu_item_id` (`menu_item_id`),
  KEY `Employee_ID` (`Employee_ID`),
  CONSTRAINT `mealpreparationlog_ibfk_1` FOREIGN KEY (`menu_item_id`) REFERENCES `menuitems` (`menu_item_id`),
  CONSTRAINT `mealpreparationlog_ibfk_2` FOREIGN KEY (`Employee_ID`) REFERENCES `employees` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mealpreparationlog`
--

LOCK TABLES `mealpreparationlog` WRITE;
/*!40000 ALTER TABLE `mealpreparationlog` DISABLE KEYS */;
/*!40000 ALTER TABLE `mealpreparationlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menuitems`
--

DROP TABLE IF EXISTS `menuitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menuitems` (
  `menu_item_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`menu_item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menuitems`
--

LOCK TABLES `menuitems` WRITE;
/*!40000 ALTER TABLE `menuitems` DISABLE KEYS */;
/*!40000 ALTER TABLE `menuitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menurecipes`
--

DROP TABLE IF EXISTS `menurecipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menurecipes` (
  `menu_recipe_id` int NOT NULL AUTO_INCREMENT,
  `menu_item_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` decimal(10,2) NOT NULL,
  PRIMARY KEY (`menu_recipe_id`),
  KEY `menu_item_id` (`menu_item_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `menurecipes_ibfk_1` FOREIGN KEY (`menu_item_id`) REFERENCES `menuitems` (`menu_item_id`),
  CONSTRAINT `menurecipes_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menurecipes`
--

LOCK TABLES `menurecipes` WRITE;
/*!40000 ALTER TABLE `menurecipes` DISABLE KEYS */;
/*!40000 ALTER TABLE `menurecipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_ID` int NOT NULL AUTO_INCREMENT,
  `Product_name` varchar(100) NOT NULL,
  `Unit` varchar(20) NOT NULL,
  `cost_price` decimal(10,2) DEFAULT NULL,
  `current_stock` decimal(10,2) DEFAULT NULL,
  `reorder_level` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`product_ID`),
  UNIQUE KEY `Product_name` (`Product_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) NOT NULL,
  `access_level` int NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `unique_role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Director',1),(2,'Manager',2),(3,'Mis officer',3),(4,'Warehouse manager',4),(5,'Store',5),(6,'Inventory',6),(7,'Chief',7),(8,'Bar attender',8);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales` (
  `sales_id` int NOT NULL AUTO_INCREMENT,
  `menu_item_id` int NOT NULL,
  `quantity` int NOT NULL,
  `sale_date` date NOT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `Employee_ID` int NOT NULL,
  PRIMARY KEY (`sales_id`),
  KEY `Employee_ID` (`Employee_ID`),
  KEY `menu_item_id` (`menu_item_id`),
  CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `employees` (`employee_id`),
  CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`menu_item_id`) REFERENCES `menuitems` (`menu_item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storeissuelog`
--

DROP TABLE IF EXISTS `storeissuelog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storeissuelog` (
  `issue_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` decimal(10,2) NOT NULL,
  `issue_date` datetime NOT NULL,
  `purpose` varchar(300) DEFAULT NULL,
  `approved_by` int DEFAULT NULL,
  PRIMARY KEY (`issue_id`),
  KEY `employee_id` (`employee_id`),
  KEY `product_id` (`product_id`),
  KEY `approved_by` (`approved_by`),
  CONSTRAINT `storeissuelog_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`),
  CONSTRAINT `storeissuelog_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_ID`),
  CONSTRAINT `storeissuelog_ibfk_3` FOREIGN KEY (`approved_by`) REFERENCES `employees` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storeissuelog`
--

LOCK TABLES `storeissuelog` WRITE;
/*!40000 ALTER TABLE `storeissuelog` DISABLE KEYS */;
/*!40000 ALTER TABLE `storeissuelog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wastagelog`
--

DROP TABLE IF EXISTS `wastagelog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wastagelog` (
  `waste_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `quantity` decimal(10,2) NOT NULL,
  `reason` varchar(500) DEFAULT NULL,
  `waste_date` date NOT NULL,
  `employee_id` int NOT NULL,
  PRIMARY KEY (`waste_id`),
  KEY `employee_id` (`employee_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `wastagelog_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`),
  CONSTRAINT `wastagelog_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wastagelog`
--

LOCK TABLES `wastagelog` WRITE;
/*!40000 ALTER TABLE `wastagelog` DISABLE KEYS */;
/*!40000 ALTER TABLE `wastagelog` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-15 18:18:18
