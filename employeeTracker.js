const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "0427TBB!",
  database: "employee_tracker"
});

connection.connect(err => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

function run() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all departments",
        "View all roles",
        "View employees by manager",
        "Add employee",
        "Add department",
        "Add roles",
        "Update employee role",
        "Update employee manager",
        "Remove employee"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "":
        
        break;
      }
    });
}