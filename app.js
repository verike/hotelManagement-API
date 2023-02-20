const mongoose = require('mongoose')
require('dotenv').config()
const express = require('express')
const router = require('./routes/index.route');
const { urlencoded } = require('express');

const app = express();

app.use('/api/v1', router);

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log(`Connected MongoDB Database`)
})
.catch(() => {
    console.log(`Error occured while connecting to Database.`)
})

app.use(urlencoded({extended: false}));
app.use(express.json());

const port = process.env.PORT || 3500
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})