const mongoose = require('mongoose');

const dbURL = 'mongodb://0.0.0.0:27017/vartavibes';

mongoose.connect(dbURL)
    .then(() => {
        console.log('Database Connected');
    })
    .catch((err) =>{
        console.log("Database Error: " + err);
    })