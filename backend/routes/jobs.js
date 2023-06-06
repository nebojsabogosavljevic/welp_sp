var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');
const { Job } = require('../models/jobs');
const authenticateJWT = require('../middleware/auth');

router.get('/', async function(req, res, next) {
    try{
        const out = await Job.find({});
        const status = out ? 200 : 404;
        res.status(status).json(out);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id', async function(req, res, next) {
    const id = req.params.id;
    const out = await Job.findById(id);
    const status = out ? 200 : 404;
    res.status(status).json(out);
});

router.post('/', async function(req, res, next) {
    const job = new Job({ ...req.body });
    const out = await job.save();
    const status = out ? 200 : 404;
    res.status(status).json(out);
});

router.put('/:id', async function(req, res, next) {
    const id = req.params.id;
    await Job.updateOne({ _id: new ObjectId(id) }, req.body);
    const prod = await Job.findById(id);
    const status = prod ? 200 : 404;
    res.status(status).json(prod);
});

router.put('/apply/:id/:username', async function(req, res, next) {
    const { id, username } = req.params;
    const prod = await Job.findByIdAndUpdate({_id: id}, { $addToSet: { Applicants: username }}, { upsert: true, new: true });
    console.log(prod);
    const status = prod ? 200 : 404;
    res.status(status).json(prod);
});

router.put('/removeApplication/:id/:username', async function(req, res, next) {
    const { id, username } = req.params;
    const prod = await Job.findByIdAndUpdate({_id: id}, { $pull: { Applicants: username }}, { upsert: true, new: true });
    console.log(prod);
    const status = prod ? 200 : 404;
    res.status(status).json(prod);
});

router.delete('/:id', async function(req, res, next) {
    const id = req.params.id;
    const out = await Job.deleteOne({ _id: new ObjectId(id) });
    const status = out ? 200 : 404;
    res.status(status).json(out);
});

module.exports = router;
