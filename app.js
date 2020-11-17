require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const userRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const propositionsRouter = require('./routes/proposition')
const indexRouter = require('./routes/index')
const fs = require('fs');

if (typeof(PhusionPassenger) !== 'undefined') {
    PhusionPassenger.configure({ autoInstall: false });
}

// Initilisation du server express
const app = express();

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

// Middleware
app.use(express.urlencoded({extended: true}));
app.use('/api/static', express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());

//Socket.io
const server = require('https').createServer(app, options);
const {io} = require('./helpers/socket')
io.attach(server, {
    cors:{}
})

// Routage
app.use('', indexRouter)
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/propositions', propositionsRouter)

// 404 Not found
app.use(function (req, res, next) {
    res.status(404).send({error: 'Oops aucune page'});
    next();
});

if (typeof(PhusionPassenger) !== 'undefined') {
    server.listen('passenger');
} else {
    server.listen(process.env.PORT);
}
