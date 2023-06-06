var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');
const { EmployerUser, EmployeeUser } = require('../models/user');


router.get('/employee/:id', async function(req, res, next) {
    const id = req.params.id;
    const out = await EmployeeUser.findById(id);
    const status = out ? 200 : 404;
    res.status(status).json(out);
});

router.get('/employer/:id', async function(req, res, next) {
    const id = req.params.id;
    const out = await EmployerUser.findById(id);
    const status = out ? 200 : 404;
    res.status(status).json(out);
});

router.get('/employee/username/:username', async function(req, res, next) {
    const username = req.params.username;
    const out = await EmployeeUser.find({ Username: username }, { Username: 1, _id: 0 });
    const status = out ? 200 : 404;
    res.status(status).json(out);
});

router.get('/employer/username/:username', async function(req, res, next) {
    const username = req.params.username;
    const out = await EmployerUser.find({ Username: username }, { Username: 1, _id: 0 });
    const status = out ? 200 : 404;
    res.status(status).json(out);
});

router.put('/employer/:id', async function(req, res, next) {
    const id = req.params.id;
    await EmployerUser.updateOne({ _id: new ObjectId(id) }, req.body);
    const prod = await EmployerUser.findById(id);
    const status = prod ? 200 : 404;
    res.status(status).json(prod);
});

router.put('/employee/:id', async function(req, res, next) {
    const id = req.params.id;
    await EmployeeUser.updateOne({ _id: new ObjectId(id) }, req.body);
    const prod = await EmployeeUser.findById(id);
    const status = prod ? 200 : 404;
    res.status(status).json(prod);
});

router.delete('/employer/:id', async function(req, res, next) {
    const id = req.params.id;
    const out = await EmployerUser.deleteOne({ _id: new ObjectId(id) });
    const status = out ? 200 : 404;
    res.status(status).json(out);
});

router.delete('/employee/:id', async function(req, res, next) {
    const id = req.params.id;
    const out = await EmployeeUser.deleteOne({ _id: new ObjectId(id) });
    const status = out ? 200 : 404;
    res.status(status).json(out);
});

module.exports = router;