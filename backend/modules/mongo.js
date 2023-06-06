const mongoose = require('mongoose');
const { Job } = require('../models/jobs');

async function connectToDB() {
    const uri = "mongodb+srv://nebojsabogosvljevic3:shKFN0SntWPBi8bz@cluster0.yd2kduz.mongodb.net/test";
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "WELP" });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
    console.log("Connected successfully");
});

}



module.exports = {
    connectToDB
}