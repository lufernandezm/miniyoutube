const mongoose = require('mongoose')
require('dotenv').config()
const dbConnectionURL = process.env.dbConnectionURL 

mongoose.connect(dbConnectionURL, {
    useNewUrlParser: true
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));
