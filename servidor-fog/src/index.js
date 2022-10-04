/**
 * NODE.JS Application
 */

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);

// Websocket
const io = require('socket.io')(server, { cors: { origin: '*' } });

// Connect to mongodb database
mongoose.connect('mongodb://db:27017/CultivarIoT', { useNewUrlParser: true });
// mongoose.connect('mongodb://localhost:27018/CultivarIoT', { useNewUrlParser: true });

app.use((req, res, next) => {
    req.io = io;
    next();
})

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Get routes
app.use(require('./routes'));

// PORT
server.listen(3333);