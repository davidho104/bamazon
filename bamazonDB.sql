DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    itemId INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    itemName VARCHAR(100) NOT NULL,
    price FLOAT(10 , 2 ) NOT NULL,
    stock INT(10),
    departmentName VARCHAR(100) NOT NULL
);
    
INSERT INTO products (itemName, price, stock, departmentName) VALUES 
	("iPhoneX", 550.00, 50, "Phones"),
    ("Samsung Galaxy S8", 450.00, 40, "Phones"),
    ("Samsung Galaxy Note9", 600.00, 45, "Phones"),
    ("MacBook Pro 13-inch", 1300.00, 30, "Laptops"),
    ("MacBook Pro 15-inch", 2000.00, 20, "Laptops"),
    ("Dell Inspiron 15 7000", 750.00, 40, "Laptops");
    
SELECT * FROM products;