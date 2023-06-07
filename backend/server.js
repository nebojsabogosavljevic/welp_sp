const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectToDB } = require('./modules/mongo');
const jobsRouter = require('./routes/jobs');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const userRouter = require('./routes/user');
require("dotenv").config({ path: ".env" });

const app = express();
const port = process.env.PROD_PORT || 8000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/jobs', jobsRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.send(`Hi! Server is listening on port ${port}`)
});

app.get('/events/:id', (req, res) => {
    const id = Number(req.params.id);
    const event = events.find(event => event.id === id);
    res.send(event);
});

connectToDB().then(() => {
    app.listen(port)
    console.log(`listening on port ${port}`)
});