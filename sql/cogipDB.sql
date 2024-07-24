CREATE DATABASE IF NOT EXISTS `cogips`;
USE `cogips`;

CREATE TABLE IF NOT EXISTS `types`(
    `id`            INT UNSIGNED    NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name`          VARCHAR(50)     NOT NULL,
    `created_at`    DATE        NOT NULL,
    `updated_at`    DATE        NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `companies`(
    `id`            INT UNSIGNED    NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name`          VARCHAR(50)     NOT NULL,
    `type_id`       INT UNSIGNED    NOT NULL,
    `country`       VARCHAR(50)     NOT NULL,
    `tva`           VARCHAR(50)     NOT NULL,
    `created_at`    DATE        NOT NULL,
    `updated_at`    DATE        NOT NULL,
    FOREIGN KEY (`type_id`) REFERENCES `types`(`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `invoices`(
    `id`            INT UNSIGNED    NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `ref`           VARCHAR(50)     NOT NULL,
    `company_id`    INT UNSIGNED    NOT NULL,
    `due_date`      DATE        NOT NULL
    `created_at`    DATE        NOT NULL,
    `updated_at`    DATE        NOT NULL,
    FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `contacts`(
    `id`            INT UNSIGNED    NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name`          VARCHAR(50)     NOT NULL,
    `company_id`    INT UNSIGNED    NOT NULL,
    `email`         VARCHAR(50)     NOT NULL,
    `phone`         VARCHAR(50)     NOT NULL,
    `created_at`    DATE        NOT NULL,
    `updated_at`    DATE        NOT NULL,
    FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `roles`(
    `id`            INT UNSIGNED    NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name`          VARCHAR(50)     NOT NULL,
    `created_at`    DATE        NOT NULL,
    `updated_at`    DATE        NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `permissions`(
    `id`            INT UNSIGNED    NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name`          VARCHAR(50)     NOT NULL,
    `created_at`    DATE        NOT NULL,
    `updated_at`    DATE        NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `roles_permissions`(
    `id`            INT UNSIGNED    NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `permission_id` INT UNSIGNED    NOT NULL,
    `role_id`       INT UNSIGNED    NOT NULL,
    FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`),
    FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `users`(
    `id`            INT UNSIGNED    NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `first_name`    VARCHAR(50)     NOT NULL,
    `role_id`       INT UNSIGNED    NOT NULL,
    `last_name`     VARCHAR(50)     NOT NULL,
    `email`         VARCHAR(50)     NOT NULL,
    `password`      VARCHAR(50)     NOT NULL,
    `created_at`    DATE        NOT NULL,
    `updated_at`    DATE        NOT NULL,
    FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`)
) ENGINE=InnoDB;
