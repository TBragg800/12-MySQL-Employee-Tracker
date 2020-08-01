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
  console.log("Welcome to Employee Tracker!");
  run();
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
      case "View all employees":
        viewEmp();
        break;
      
      case "View all departments":
        viewDep();
        break;
    
      case "View all roles":
        viewRole();
        break;

      case "View employees by manager":
        viewMan();
        break;

      case "Add employee":
        addEmp();
        break;

      case "Add department":
        addDep();
        break;

      case "Add roles":
        addRole();
        break;

      case "Update employee role":
        updateRole();
        break;

      case "Update employee manager":
        updateMan();
        break;

      case "Remove employee":
        removeEmp();
        break;
      }
    });
}

function viewEmp() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    run();
  });
}

function viewDep() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    run();
  });
}

function viewRole() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    run();
  });
}