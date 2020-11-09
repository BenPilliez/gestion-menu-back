require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const userRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const propositionsRouter = require('./routes/proposition')


// Initilisation du server express
const app = express();

// Middleware
app.use(express.urlencoded({extended: true}));
app.use('/api/static', express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());

// Routage
app.use('/api/auth/', authRouter)
app.use('/api/user', userRouter)
app.use('/api/propositions',propositionsRouter)

// 404 Not found
app.use(function (req, res, next) {
    res.status(404).send({error: 'Oops aucune page'});
    next();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('APP listening on ' + port);
});
