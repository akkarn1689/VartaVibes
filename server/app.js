if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Libraries:
const express = require('express');
const app = express();     //
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Models:
const User = require('./models/users');

// Environment variables:
const jwtSecret = process.env.JWT_SECRET;
const dbUrl = process.env.DB_URL || 'mongodb://0.0.0.0:27017/chatapp';

// Database connection
mongoose.connect(dbUrl)
    .then(() => {
        console.log("Database Connected");
    })
    .catch(err => {
        console.log("MONGO CONNECTION ERROR!!!");
        console.log(err);
    })

//
const corsOption = {
    origin: ['http://localhost:3001'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});



// Routes 
app.get("/", (req, res) => {
    res.send('Hi')
    // res.setHeader("Access-Control-Allow-Origin", "*")
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Max-Age", "1800");
    // res.setHeader("Access-Control-Allow-Headers", "content-type");
    // res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
});

app.get('/register', (req, res, next) => {
    res.send('Welcome');
})

app.post('/register', async (req, res, next) => {
    // console.log(req);
    const { username, email, password } = req.body;
    console.log(username, email, password);
    try {
        const registeredUser = await User.create({ username, email, password });
        jwt.sign({ userId: registeredUser._id }, jwtSecret, {}, (err, token) => {
            if (err) throw err; // show only message in the production
            res.cookie('token', token).status(201).json('ok');
        });
    } catch (err) {
        if (err) throw err;
        res.status(500).json('error');
        console.log(err);
    }
})



app.listen(3001, () => {
    console.log("Serving on port 3001!");
})