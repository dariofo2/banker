CREATE DATABASE IF NOT EXISTS banker;
USE banker;
CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(256) NOT NULL UNIQUE,
    password VARCHAR(256) NOT NULL,
    email VARCHAR(256) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS accounts (
    id INT NOT NULL AUTO_INCREMENT,
    userId INT NOT NULL,
    number VARCHAR(256) NOT NULL,
    type VARCHAR(256) NOT NULL,
    balance INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS movements (
    id INT NOT NULL AUTO_INCREMENT,
    originAccountId INT NOT NULL,
    destinationAccountId INT NOT NULL,
    type VARCHAR,
    concept VARCHAR,
    money INT NOT NULL,
    date INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (originAccountId) REFERENCES accounts(id) ON DELETE CASCADE,
    FOREIGN KEY (destinationAccountId) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS blockchain_accounts (
    id INT NOT NULL AUTO_INCREMENT,
    address VARCHAR(256) NOT NULL,
    userId INT NOT NULL,
    privatekey VARCHAR(256) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
);

DELIMITER $$

CREATE TRIGGER update_money_on_insert_movement
AFTER INSERT ON movements
FOR EACH ROW
BEGIN
    UPDATE accounts set balance=balance+new.money where new.destinationAccountId=accounts.id;
    if new.originAccountId!=new.destinationAccountId then
    UPDATE accounts set balance=balance-new.money where new.originAccountId=accounts.id;
    end if;
END; $$

CREATE TRIGGER update_money_on_delete_movement
AFTER DELETE ON movements
FOR EACH ROW
BEGIN
    UPDATE accounts set balance=balance-old.money where old.destinationAccountId=accounts.id;
    if old.originAccountId!=old.destinationAccountId then
    UPDATE accounts set balance=balance+old.money where old.originAccountId=accounts.id;
    end if;
END; $$

/* Constraint para variables con valor ""
mysql> delimiter $

mysql> create trigger foo before insert on yar
    -> for each row
    -> begin
    -> if new.val = '' then
    -> signal sqlstate '45000';
    -> end if;
    -> end;$
Query OK, 0 rows affected (0.01 sec)

mysql> delimiter ;


*/
DELIMITER;
