USE employees;

INSERT INTO department (name)
VALUES
    ('Manager'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES 
    ('Manager', 200000, 1),
    ('Engineer', 150000, 2),
    ('Accountant', 120000, 3),
    ('Attorney', 170000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Meryl', 'streep', 1, null),
    ('Andrew', 'Garfield', 2, 1),
    ('Hugh', 'Jackman', 3, 1),
    ('Cameron', 'Diaz', 4, 1);



