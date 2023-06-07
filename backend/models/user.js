const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchemaEmployers = new Schema({
    Name: String,
    Surname: String,
    Username: String,
    Password: String,
    Email: String,
    Phone: String,
    City: String,
    Country: String,
    Address: String
});

const userSchemaEmployees = new Schema({
    Name: String,
    Surname: String,
    Username: String,
    Password: String,
    Email: String,
    Phone: String,
    City: String,
    Country: String,
    Address: String,
    IdCardNumber: String,
    Citizenship: String,
});

const EmployerUser = mongoose.model('EmployerUser', userSchemaEmployers, 'Employers');
const EmployeeUser = mongoose.model('EmployeeUser', userSchemaEmployees, 'Employees');

module.exports = { EmployerUser, EmployeeUser };