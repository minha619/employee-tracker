const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connection = mysql.createConnection(
    {
        host: 'localhost',
        // port: 3001,
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'apple',
        database: 'employees'
    },
    console.log('Connected to the employees database.')
);

initialPrompt();


function initialPrompt() {
    inquirer.prompt({
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: [
            "View all departments",
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
                    connection.end();
                    break;
            }
        });
}


function viewDepartments() {
    console.log("\n View all departments \n");

    let query = 'SELECT * FROM department;';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);

        initialPrompt();
    });
}

function viewRoles() {
    console.log("\n View all roles \n");

    let query = 'SELECT * FROM role;';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);

        initialPrompt();
    })
}


function viewEmployees() {
    console.log("\n View all employees \n");

    let query = 'SELECT * FROM employee;';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);

        initialPrompt();
    })
}

function addDepartment() {
    // console.log("\n Add a department \n");

    inquirer.prompt([
        {
            type: "input",
            name: "departmentName",
            message: "\n What is the name of a new department? \n"
        }
    ])
        .then(function (answer) {

            let query = 'INSERT INTO department (name) VALUES (?)';
            connection.query(query, [answer.departmentName], function (err, res) {
                console.log('New department successfully added!');

                initialPrompt();
            });
        })
}

function addRole() {
    // console.log("\n Add a role \n");

    connection.query("SELECT * FROM department", function (err, res) {
        // console.log(res);
        const departmentChoices = res.map(function (departmentObj) {
            // console.log(departmentObj);
            return {
                name: departmentObj.name,
                value: departmentObj.id
            }
        })
        // console.log(departmentChoices);
        inquirer.prompt([
            {
                type: "input",
                name: "roleName",
                message: "\n What is the new role? \n"
            },
            {
                type: "input",
                name: "roleSalary",
                message: "\n What is the new role's salary? \n"
            },
            {
                type: "list",
                name: "roleDepartment",
                message: "\n Choose the new role's department. \n",
                choices: departmentChoices
            }
        ])
            .then(function (answer) {
                console.log(answer)
                let query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
                connection.query(query, [answer.roleName, answer.roleSalary, answer.roleDepartment], function (err, res) {
                    console.log('New role successfully added!');

                    initialPrompt();
                });
            })
    });
}


function addEmployee() {
    // console.log("\n Add an employee \n");

    connection.query("SELECT * FROM role", function (err, res) {
        // console.log(res);
        const roleChoices = res.map(function (roleObj) {
            // console.log(departmentObj);
            return {
                name: roleObj.title,
                value: roleObj.id
            }
        })
        connection.query("SELECT * FROM employee", function (err, res) {
            // console.log(res);
            const employeeChoices = res.map(function (employeeObj) {
                // console.log(departmentObj);
                return {
                    name: employeeObj.first_name + " " + employeeObj.last_name,
                    value: employeeObj.id
                }
            })

            inquirer.prompt([
                {
                    type: "input",
                    name: "first_name",
                    message: "\n What is the employee's first name? \n"
                },
                {
                    type: "input",
                    name: "last_name",
                    message: "\n What is the employee's last name? \n"
                },
                {
                    type: "list",
                    name: "role_id",
                    message: "\n What is the employee's role? \n",
                    choices: roleChoices
                },
                {
                    type: "list",
                    name: "manager_id",
                    message: "\n Who is the employee's manager? Choose the manager's id. \n",
                    choices: employeeChoices
                }
            ])
                .then(function (answer) {

                    let query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
                    connection.query(query, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], function (err, res) {
                        console.log('New employee successfully added!');

                        initialPrompt();
                    });
                })
        })
    })
}

function updateEmployeeRole() {

    connection.query("SELECT * FROM role", function (err, res) {
        // console.log(res);
        const roleChoices = res.map(function (roleObj) {
            // console.log(departmentObj);
            return {
                name: roleObj.title,
                value: roleObj.id
            }
        })
        connection.query("SELECT * FROM employee", function (err, res) {
            // console.log(res);
            const employeeChoices = res.map(function (employeeObj) {
                return {
                    name: employeeObj.first_name + " " + employeeObj.last_name,
                    value: employeeObj.id
                }
            })

            inquirer.prompt([
                {
                    type: "list",
                    name: "employee_id",
                    message: "\n Which employee would you like to update? \n",
                    choices: employeeChoices
                },
                {
                    type: "list",
                    name: "role_id",
                    message: "\n Which role would you like to change to? \n",
                    choices: roleChoices
                }
            ])
                .then(function (answer) {

                    let query = 'UPDATE employee SET role_id = ? WHERE id = ?';
                    connection.query(query, [answer.role_id, answer.employee_id], function (err, res) {
                        console.log('Employee successfully updated!');

                        initialPrompt();
                    });
                })
        })
    })
}
