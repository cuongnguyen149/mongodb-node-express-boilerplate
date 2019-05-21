import express from 'express';
import morgan from 'morgan';
import path from 'path';
import rfs from 'rotating-file-stream';
import logger from './src/logger/logger';
import connectMongo from 'connect-mongo';
import session from 'express-session';
import Db from './src/database/mongoDBConection';
import Test from './src/model/testModel';
// create a rotating write stream
const accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
})
// start DB connection
const db = new Db();

// create app
const app = express();

// add session storage
const MongoStore = connectMongo(session);
app.use(
    session({
        secret: 'your_session_secret',
        name: 'access_session',
        saveUninitialized: false, // don't create session until something stored
        resave: true,
        cookie: {
            // secure: true // Apply only when running HTTPS
            maxAge: 3600000,
        }, // = 1 hour.
        store: new MongoStore({
            mongooseConnection: db.connection,
            ttl: 1 * 1 * 60 * 60, // = 1 hour.
        }),
    }),
);
// app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('combined'));

app.get('/test-log', (req, res) => {
    var testObj = new Test({
        Citicode1: 'test'
    });
    testObj.save(function (err, testObj) {
        if (!err) {
            logger.info('Save success ' + testObj);
        } else {
            logger.error(err);
        }

    });
    res.send('Hello World!');
});

app.listen(3000, () =>
    console.log('Example app listening on port 3000!'),
);