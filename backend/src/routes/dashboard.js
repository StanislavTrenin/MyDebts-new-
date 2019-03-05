const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const verifyJWT_MW  = require('../middleware');


const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'debts_db'
});
const app = express();



app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));
app.use(cookieParser());

app.all('*', verifyJWT_MW);

app.get('/', (req, res) =>
{
    res.status(200)
        .json({
            success: true,
            data: "Super secret data!"
        })
});

app.get('/', (req, res, next) => {
    console.log('!!!List of Debts should be protected!!!');
    connection.query('SELECT * from debts', function (err, rows, fields) {
        if (!err) {
            console.log('The solution is: ', rows);
            //const qs = rows;
            res.send(rows);
        }
        else {
            console.log('Error while performing Query.');
        }
    });



});


app.post('/', (req, res) => {
    const {person_id, sum, description, is_borrow} = req.body;
    const newDebt = [person_id, sum, description, is_borrow];
    console.log('Put: ', newDebt);
    connection.query('INSERT INTO debts (person_id, sum, description, is_borrow) VALUES (?, ?, ?, ?)', newDebt, function (err, rows) {
        if (err) {
            console.log('Error while performing Query.');
        }
    });
    res.status(200).send();
});

app.post('/login', (req, res) => {
    console.log('user login');

    const login = req.body.login;
    const password = req.body.password;
    console.log('Find: ', login);
    connection.query('SELECT password FROM users WHERE login = '+login, function (err, rows, fields) {
        if (!err) {
            console.log('password: '+rows[0].password);
            if(rows[0].password === password) {
                res.status(200).send();
            }
        } else {
            console.log('Error while performing Query.');
        }
    });
    //req.session.login = req.body.login;
    res.end()
});

app.post('/signup', (req, res) => {
    console.log('user signup');
    const {login, email, password} = req.body;
    const newUser = [login, email, password];
    console.log('Put: ', newUser);
    connection.query('INSERT INTO users (login, email, password) VALUES (?, ?, ?)', newUser, function (err, rows) {
        if (err) {
            console.log('Error while performing Query.');
        }
    });
    //req.session.login = req.body.login;
    res.end()
});


app.post('/close/:id', (req, res) => {
    const id = req.body.id;
    console.log('Close: ', id);
    connection.query('DELETE FROM debts WHERE id = ' + id, function (err, rows) {
        if (err) {
            console.log('Error while performing Query.');
        }
    });
    res.status(200).send();
    //res.redirect('back');
});

module.exports = app;