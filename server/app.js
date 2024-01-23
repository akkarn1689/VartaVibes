if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

//
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const ws = require('ws');
const jwt = require('jsonwebtoken');

//
const User = require('./models/users');
const MessageModel = require('./models/messages');

//
require('./db/connection');
// const User = require('./models/users');


const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    // optionSuccessStatus: 200,
}

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

app.use(cors(corsOptions));

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Credentials', true);
//     next();
// })


//
app.use(cookieParser());
app.use(express.json());

app.use(require('./routes/auth'));

const PORT = process.env.PORT;



// app.get('/', (req, res) => {
//     res.send("Hello! from server")
// })

// app.get('/about', (req, res) => {
//     res.send("About")
// })

// app.get('/contact', (req, res) => {
//     res.send("Contact")
// })

// app.get('/signin', (req, res) => {
//     res.send("SignIn")
// })

// app.get('/signup', (req, res) => {
//     res.send("Register")
// })



const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const wss = new ws.WebSocketServer({ server });

// websocket connection
wss.on('connection', (connection, req) => {
    // console.log(req.headers);
    const tokenString = req.headers.cookie;
    if (tokenString) {
        const token = tokenString.split('=')[1];
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
                if (err) throw err;

                const rootUser = await User.findOne({ _id: userData._id, "tokens.token": token });
                // console.log(rootUser);
                const { _id, name, username, email } = rootUser;

                connection.userId = _id;
                connection.username = username;
            });
        }
    }

    connection.on('message', async (message) => {
        // console.log(message);
        const messageData = JSON.parse(message.toString());
        console.log(messageData);
        const { receiver, text, time } = messageData;
        if (receiver && text && time) {
            const mes = new MessageModel({
                sender: connection.userId,
                receiver: receiver,
                text,
                time,
            });

            const messageDoc = await mes.save();

            console.log(messageDoc);

            [...wss.clients].forEach(c => {
                c.send(JSON.stringify({
                    message: {
                        sender: connection.userId,
                        receiver: receiver,
                        text: text,
                        time: time,
                        id: messageDoc._id,
                    }
                }))
                // if (c.userId === receiver) {
                //     c.send(JSON.stringify({ text: text }))
                // }
            });
        }
    });

    // sending everyone data aboout online users
    [...wss.clients].forEach(client => {
        client.send(JSON.stringify({
            online: [...wss.clients].map(c => ({ userId: c.userId, username: c.username }))
        }))
    });


});
