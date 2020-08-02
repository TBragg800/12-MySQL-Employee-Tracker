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

function viewMan() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    run();
  });
}

function addEmp() {
  inquirer
    .prompt([
      {
      name: "first_name",
      type: "input",
      message: "Enter the employee's first name.",
      validate: function(answer) {
        if (answer !== "") {
            return true;
        }
        return "Employee's first name must contain at least one character.";
        }
      },
      {
      name: "last_name",
      type: "input",
      message: "Enter the employee's last name.",
      validate: function(answer) {
        if (answer !== "") {
            return true;
        }
        return "Employee's first name must contain at least one character.";
        }

      },
      {
      name: "role_id",
      type: "input",
      message: "Enter the employee's role id.",
      validate: function(answer) {
        if (isNaN(answer) === false) {
            return true;
        }
        return false;
        }
      },
      {
      name: "manager_id",
      type: "input",
      message: "Enter the employee's manager id.",
      validate: function(answer) {
          if (isNaN(answer) === false) {
              return true;
          }
          return false;
      }
      }
  ])
  .then(function(answer) {
    connection.query("INSERT INTO employee SET ?",
        {first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id || 0,
          manager_id: answer.manager_id || 0},
        function(err) {
          if (err) throw err;
          console.log("You have successfully added this employee!");
          run();
        }
      );
  });
};

function addDep() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "Enter the department you want to add."
      })
    .then(function(answer) {
      connection.query("INSERT INTO department SET ?",
        { name: answer.department },
        function(err) {
          if (err) throw err;
          console.log("You have successfully added this department!");
          run();
        }
      );
  });
};

function addRole() {
  inquirer
    .prompt([
      {
      name: "title",
      type: "input",
      message: "Please enter the role's title.",
      validate: function(answer) {
        if (answer !== "") {
            return true;
        }
        return "The role must contain at least one character.";
        }
      },
      {
      name: "salary",
      type: "input",
      message: "Please enter the role's salary.",

      },
      {
      name: "department_id",
      type: "input",
      message: "Please enter the department id.",
      validate: function(answer) {
        if (isNaN(answer) === false) {
            return true;
        }
        return false;
      }

      }
    ])
    .then(function(answer) {
      connection.query("INSERT INTO role SET ?",
        {title: answer.title,
          salary: answer.salary || 0,
          department_id: answer.department_id || 0},
        function(err) {
          if (err) throw err;
          console.log("You have successfully added this role!");
          run();
        }
      );
  });
};