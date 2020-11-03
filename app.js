require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose')

// Connection à mongoDB
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        console.debug('Connection réussi')
        // Initilisation du server express
        const app = express();

        // Middleware
        app.use(express.urlencoded({extended: true}));
        app.use('/static', express.static(path.join(__dirname, 'public')))
        app.use(express.json());
        app.use(cookieParser());
        app.use(morgan('dev'));
        app.use(cors());

    // Routage

    // 404 Not found
        app.use(function (req, res, next) {
            res.status(404).send('Oops aucune page');
            next();
        });

        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log('APP listening on ' + port);
        });


    }).catch((err) => {
    console.error(err)
})
