/*
 Navicat Premium Data Transfer

 Source Server         : Localhost
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost
 Source Database       : cPet

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : utf-8

 Date: 08/10/2017 22:22:52 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `cSessionInfo`
-- ----------------------------
DROP TABLE IF EXISTS `cSessionInfo`;
CREATE TABLE `cSessionInfo` (
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `skey` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `session_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_info` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`open_id`),
  KEY `openid` (`open_id`) USING BTREE,
  KEY `skey` (`skey`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会话管理用户信息';

SET FOREIGN_KEY_CHECKS = 1;

DROP TABLE IF EXISTS `cPersonInfo`;
CREATE Table `cPersonInfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT, 
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nickname` varchar(100),
  `name` varchar(100),
  `area` varchar(100),
  `hobby` varchar(100),
  PRIMARY KEY (`id`),
  KEY `personinfoid` (`id`) USING BTREE,
  KEY `area` (`area`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户个人信息';

ALTER TABLE `cPersonInfo` ADD CONSTRAINT `fk_per` FOREIGN KEY (`open_id`) REFERENCES `cSessionInfo` (`open_id`);

SET FOREIGN_KEY_CHECKS = 1; 

DROP TABLE IF EXISTS `cPetInfo`;
CREATE TABLE `cPetInfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT, 
  `masterid` int(11) NOT NULL,
  `name` varchar(100),
  `type` varchar(100),
  `age` int(11),
  PRIMARY KEY(`id`),
  KEY `petinfoid` (`id`) USING BTREE,
  KEY `type` (`type`) USIng BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='宠物信息';

ALTER TABLE `cPetInfo` ADD CONSTRAINT `fk_pet` FOREIGN KEY (`masterid`) REFERENCES `cPersonInfo` (`id`);

SET FOREIGN_KEY_CHECKS = 1;

DROP TABLE IF EXISTS `cSysCodeType`;
CREATE TABLE `cSysCodeType` (
  `id` int(11) NOT NULL AUTO_INCREMENT, 
  `codeid` int(11) NOT NULL unique,
  `name` varchar(100),
  `note` varchar(100),
  PRIMARY KEY(`id`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='编码类型表';

SET FOREIGN_KEY_CHECKS = 1;

DROP TABLE IF EXISTS `cSysCode`;
CREATE TABLE `cSysCode` (
  `id` int(11) NOT NULL AUTO_INCREMENT, 
  `codeid` int(11) NOT NULL,
  `typeid` int(11) NOT NULL,
  `sort` int(11),
  `name` varchar(100),
  `note` varchar(100),
  PRIMARY KEY(`id`),
  KEY `typeid` (`typeid`) USIng BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='编码表';

ALTER TABLE `cSysCode` ADD CONSTRAINT `fk_typeid` FOREIGN KEY (`typeid`) REFERENCES `cSysCodeType` (`codeid`);

SET FOREIGN_KEY_CHECKS = 1;

DROP TABLE IF EXISTS `cSysConfig`;
CREATE TABLE `cSysConfig` (
  `id` int(11) NOT NULL AUTO_INCREMENT, 
  `name`  varchar(100) NOT NULL,
  `version` int(11) NOT NULL DEFAULT 0,
  `note` varchar(100),
  PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='配置表';