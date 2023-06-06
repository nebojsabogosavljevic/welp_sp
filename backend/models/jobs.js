const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobsSchema = new Schema({
    Title: String,
    Category: String,
    Description: String,
    Location: String,
    Date: String,
    Time: String,
    Salary: String,
    EmployerId: String,
    Applicants: Array,
});

const Job = mongoose.model('Job', jobsSchema, 'Jobs');

module.exports = { Job };