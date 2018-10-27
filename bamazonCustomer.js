const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    showTable();
})

function showTable() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log("\n WELCOME TO BAMAZON");
        results.forEach(products => {
            console.log(`${products.itemId}  ${products.itemName}  ${products.price}  ${products.stock}  ${products.departmentName}`)
        })
        inquirer.prompt([{
            type: "input",
            name: "itemId",
            message: "Enter Item ID Number",
            validate: function (value) {
                if (!isNaN(value)) {
                    return true;
                } else {
                    return false;
                    console.log("Please enter an appropriate number");
                }
            }
        }, {
            type: "input",
            name: "quantity",
            message: "Enter quantity",
            validate: function (value) {
                if (!isNaN(value)) {
                    return true;
                } else {
                    return false;
                    console.log("Please enter an appropriate number");
                }
            }
        }]).then(function (answers) {
            connection.query("SELECT * FROM products WHERE itemId = " + answers.itemId, function (err, results) {
                try {
                    if (results[0].stock < answers.quantity) {
                        console.log("\n There's not enough stock");
                        showTable();
                    } else {
                        connection.query("UPDATE products SET stock = stock - " + answers.quantity + " WHERE itemId = " + answers.itemId, function (err, results) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("The total is now: $" + results[0].price * answers.quantity);
                            }
                            connection.end();
                        });
                    }
                }catch(err){
                    console.log("Error: ", err.message);
                    connection.end();
                }
            })
        })
    })
}