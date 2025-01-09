CREATE DATABASE IF NOT EXISTS banker;
USE banker;
CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(30) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS accounts (
    id INT NOT NULL AUTO_INCREMENT,
    userid INT NOT NULL,
    name VARCHAR(20) NOT NULL,
    type VARCHAR(20) NOT NULL,
    balance INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS movements (
    id INT NOT NULL AUTO_INCREMENT,
    origin_account_id INT NOT NULL,
    destination_account_id INT NOT NULL,
    money INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (origin_account_id) REFERENCES accounts(id) ON DELETE CASCADE,
    FOREIGN KEY (destination_account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

DELIMITER $$

CREATE TRIGGER update_money_on_insert_movement
AFTER INSERT ON movements
FOR EACH ROW
BEGIN
    UPDATE accounts set balance=balance+new.money where new.destination_account_id=accounts.id;
    if new.origin_account_id!=new.destination_account_id then
    UPDATE accounts set balance=balance-new.money where new.origin_account_id=accounts.id;
    end if;
END; $$

CREATE TRIGGER update_money_on_delete_movement
AFTER DELETE ON movements
FOR EACH ROW
BEGIN
    UPDATE accounts set balance=balance-old.money where old.destination_account_id=accounts.id;
    if old.origin_account_id!=old.destination_account_id then
    UPDATE accounts set balance=balance+old.money where old.origin_account_id=accounts.id;
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
