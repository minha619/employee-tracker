const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connection = mysql.createConnection(
    {
        host: 'localhost',
        part: 3001,
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'apple',
        database: 'employees'
    },
    console.log('Connected to the employees database.')
);

initialPrompt();
// connection.connect(function (err) {
//     if (err) throw err;
//     console.log('Database connected.');
//     initialPrompt();
// });

function initialPrompt() {
    inquirer.prompt({
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: [
            "View all deapartments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee role",
            "Quit"
        ]
    })
        .then((options) => {
            switch (options.options) {
                case "View all departments":
                    viewDepartments();
                    break;

                case "View all roles":
                    viewRoles();
                    break;

                case "View all employees":
                    viewEmployees();
                    break;

                case "Add a department":
                    addDepartment();
                    break;

                case "Add a role":
                    addRole();
                    break;

                case "Add an employee":
                    addEmployee();
                    break;

                case "Update an employee role":
                    updateEmployeeRole();
                    break;

                case "Quit": ``
                    connection.quit();
                    break;
            }
        });
}


function viewDepartments() {
    console.log("View all departments");

    let query = 'SELECT * FROM department;';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);

        initialPrompt();
    });
}

// function viewEmployees(){
//     console.log("View all employees");

//     let query = 'SELECT * FROM employee;';
//     connection.query(query, function (err, res){
//         if (err) throw err;
//         console.table(res);

//         initialPrompt();
//     })
// }
