CREATE DATABASE dbStockolmo;
USE dbStockolmo;

CREATE TABLE tbTasks(
	id INT AUTO_INCREMENT,
    title VARCHAR(128) NOT NULL,
    startDate DATETIME,
    endDate DATETIME,
    startDateString VARCHAR(64),
    endDateString VARCHAR(64),
    priorit VARCHAR(16) NOT NULL,
    stats INT NOT NULL,
    PRIMARY KEY (id)
) engine = innodb;
