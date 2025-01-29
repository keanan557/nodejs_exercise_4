// install npm init - y,type module,express,nodemon,sql2/promise

// importing packages
import mysql from 'mysql2/promise'
import express from 'express'
import {config} from 'dotenv'
config()

// db connection using mysql2

const pool = mysql.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})

const app = express()

app.use(express.json())
// Create a function/ query that will return all the employee data.
const getEmployees = async ()=>{
    let [data] = await pool.query('select * from employees')
    return data
}

// display
console.log(await getEmployees());

// Create a function/ query that will return a single employee based on their
// employee_id.
const getSingleEmployee = async(employee_id)=>{
    let [data] = await pool.query('select * from employees where employee_id=?',[employee_id])
    return data
}

// display result
console.log(await getSingleEmployee(1));


//  Create a function/ query that adds a new employee and then returns all the
// employees so you can see if the data was added
const addNewEmployee= async (first_name, last_name, email, phone_number, department, salary)=>{
    pool.query('INSERT INTO `pick_n_steal`.`employees` ( `first_name`, `last_name`, `email`, `phone_number`, `department`, `salary`) VALUES (?,?,?,?,?,?);',
        [first_name, last_name, email, phone_number, department, salary])
    return await getEmployees()
}

 console.log(addNewEmployee('Chris','Redface','Chris.RedFace@example.com','555-985','Sales',150000.00));

// Create a function/ query that will remove an employee from the table based on their
// employee id and then returns all the employees so you can see if the data was
// removed.
const removeEmployee= async ()=>{
    pool.query('Delete from employees where employee_id = ?',[employee_id])
    return await getEmployees()
}

console.log(removeEmployee(5));

// Create a function/ query that will be able to update all the values of an employee
// based on their employee id and then returns the employees new data that was
// edited.
const updateEmployee = async (first_name,last_name, email, phone_number, department, salary,employee_id) => {
    console.log('lololololololololololol'+employee_id);
    
    await pool.query('update employees set first_name=?,last_name=?, email=?, phone_number=?, department=?, salary=? where employee_id=?',
        [first_name,last_name, email, phone_number, department, salary,employee_id])
    return 'update complete'//await getEmployees()
}

console.log(await updateEmployee('Chris','Redfield','chris.redfield@racooncity.com','555-193','Security','200000.00',5));


