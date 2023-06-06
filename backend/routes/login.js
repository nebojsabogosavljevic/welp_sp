var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');
const { EmployerUser, EmployeeUser } = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/:userType', async function(req, res) {
    const userTypeToFind = req.params.userType;
    const { username, password } = req.body;
    let [out, testResult] = [null, null];
    
    const testParams = (username, password, outUsername, outRegister) => {
        if (!username || !password, !outUsername || !outRegister) {
            throw new Error('Missing parameters');
        } else if (outUsername !== username) {
            throw new Error('Wrong username');
        } else if (outRegister !== password) {
            throw new Error('Wrong password');
        }
        return true;
    };
    try {
        if (!username || !password) {
            throw new Error('Missing parameters');
        } else if (username.length < 5 || password.length < 5) {
            throw new Error('Username and password must be at least 3 characters long');
        }
        if (userTypeToFind === 'Employer') {
            const findUserQuery = EmployerUser.findOne({ Username: username, Password: password });
            out = await findUserQuery.exec();
            if (!out) {
                throw new Error('User not found');
            }
            testResult = testParams(username, password, out?.Username, out?.Password);
        } else if (userTypeToFind === 'Employee') {
            out = await EmployeeUser.findOne({ Username: username, Password: password });
            if (!out) {
                throw new Error('User not found');
            }
            testResult = testParams(username, password, out?.Username, out?.Password);
        } else {
            throw new Error('User type not found');
        }
    } catch (error) {
        console.log(error.message);
        res.status(200).json({ status: false, message: error.message });
        return;
    }
    const token = jwt.sign({ id: out._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const status = testResult === true ? 200 : 404;
    res.status(status).json({ status: testResult, token });
});

module.exports = router;
