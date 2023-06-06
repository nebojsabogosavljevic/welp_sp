var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');
const { EmployerUser, EmployeeUser } = require('../models/user');


router.post('/employee', async function(req, res) {
    console.log("asdasd", req.body);
    const { name, surname, username, password, email, phone, city, country, address, idCatdNumber, citizenship,
    languages } = req.body;
    let out = null;
    
    try {
        if (!username || !password, name, surname, email, phone, city, country, address, idCatdNumber) {
            throw new Error('Missing parameters');
        } else if (username.length < 5 || password.length < 5) {
            throw new Error('Username and password must be at least 3 characters long');
        }
        out = await EmployeeUser.findOne({ Username: username });
        if (out) {
            throw new Error('User with this username already exists');
        } 
        console.log("asdasdasd")
        const newUser = new EmployeeUser({
            Name: name, Surname: surname, Username: username, Password: password, Email: email, Phone: phone, City: city,
            Country: country, Address: address, IdCardNumber: idCatdNumber, Citizenship: citizenship
        });
        await newUser.save();
        out = await EmployeeUser.findOne({ Username: username });
        if (!out) {
            throw new Error('User was not created, please try again or contact support');
        }
    } catch (error) {
        console.log(error.message);
        res.status(200).json({ status: false, message: error.message });
        return;
    }
    const status = out ? 200 : 404;
    const outStatus = out ? true : false;
    res.status(status).json({ status: outStatus});
});

router.post('/employer', async function(req, res) {
    const { name, surname, username, password, email, phone, city, country, address } = req.body;
    let out = null;
    
    try {
        if (!username || !password, name, surname, email, phone, city, country, address) {
            throw new Error('Missing parameters');
        } else if (username.length < 5 || password.length < 5) {
            throw new Error('Username and password must be at least 3 characters long');
        }
        out = await EmployerUser.findOne({ Username: username });
        if (out) {
            throw new Error('User with this username already exists');
        } 
        const newUser = new EmployerUser({
            Name: name, Surname: surname, Username: username, Password: password, Email: email, Phone: phone, City: city
        });
        await newUser.save();
        out = await EmployerUser.findOne({ Username: username });
        if (!out) {
            throw new Error('User was not created, please try again or contact support');
        }
    } catch (error) {
        console.log(error.message);
        res.status(200).json({ status: false, message: error.message });
        return;
    }
    const status = out ? 200 : 404;
    const outStatus = out ? true : false;
    res.status(status).json({ status: outStatus});
});
module.exports = router;
