const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const auth = require('../libs/auth');
const passwordHash = require('password-hash');
//const cookieParser = require('cookie-parser');

const verifyJWT_MW = require('../middleware');


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
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(cors());
app.use(morgan('combined'));
const router = express.Router();


app.use(router);


router.post('/login', (req, res) => {
    console.log('user login with jwt');
    let {email, password} = req.body;
    console.log('email = ' + email + ' password = ' + password);
    const newPassword = passwordHash.generate(password);
    console.log('New password = '+newPassword);

    connection.query('SELECT user_id, login, email, password FROM users WHERE login = ' + email, function (err, rows) {
        if (err) {
            console.log('Error while performing Query.');
        } else {

            if(rows.length == 1) {
                console.log('Res of sql = ' + JSON.stringify(rows));
                if(passwordHash.verify(password, rows[0].password)) {

                    let data = JSON.stringify(rows);

                    auth.createJWToken({sessionData: data, maxAge: 3600}).then((result) => {
                        //const token = req.token;
                        console.log('after log in created token = ' + result);
                        res.status(200).json({success: true, token: result, id: rows[0].user_id});
                    });
                }
            } else {
                console.log('User does not exist!!!');
                res.status(400).json({message: "User does not exist!!!"})
            }
        }

    });


});

router.post('/signup', (req, res) => {
    console.log('user signup');
    const {login, email, password} = req.body;
    const newPassword = passwordHash.generate(password);
    console.log('New password = '+newPassword);
    const newUser = [login, email, newPassword];
    console.log('Put: ', newUser);

    connection.query('SELECT COUNT(*) AS quantity FROM users WHERE login = '+login, function (err, rows) {
        if (!err) {
            console.log('quantity = '+rows[0].quantity);
            if(rows[0].quantity === 0){
                console.log('there');
                connection.query('INSERT INTO users (login, email, password) VALUES (?, ?, ?)', newUser, function (err, rows) {
                    if (!err) {
                        console.log('there');
                        res.status(200).json({success: true});
                    } else {
                        console.log('Error while performing Query.');
                        res.status(400).json({message: "User already exist!!!"});
                    }
                });
            } else {
                res.status(400).json({message: "User already exist!!!"});
            }
        } else {
            res.status(400).json({message: "User already exist!!!"});
        }
    });


});

/*app.post('/debts', function (req,res,next) {
    console.log('get token '+req.body.token)

});*/

/*app.get('/', function (req, res) {
    console.log('on main page with params');
    let page = req.query.page;
    let limit = req.query.limit;
    console.log('page = '+page+' limit = '+limit);

});*/

app.all('*', (req, res, next) => {
    console.log('there ');
    let token = req.body.token;
    //let token = (req.method === 'POST') ? req.body.token : req.query.token;
    //let token = req.query.token;
    console.log('token = ' + token);
    auth.verifyJWTToken(token)
        .then((decodedToken) => {
            console.log('success!!!');
            req.user = decodedToken.data;
            next()
            //res.status(200).json('all ok');
        })
        .catch((err) => {
            console.log(err);
            res.status(400)
                .json({message: "Invalid auth token provided."})
        })

});

/*app.get('/', (req, res) =>
{
    console.log('in secret');
    res.status(200)
        .json({
            success: true,
            data: "Super secret data!"
        })
});*/

app.post('/debts', (req, res, next) => {
    connection.query('SELECT * from debts WHERE creator_id = '+req.body.id, function (err, rows, fields) {
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

app.post('/contacts', (req, res, next) => {
    connection.query('SELECT * from contacts WHERE creator_id = '+req.body.id, function (err, rows, fields) {
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

app.post('/getStat', (req, res, next) => {
    connection.query('SELECT SUM(sum) AS lend FROM debts WHERE creator_id = '+req.body.creator_id+' AND person_id = '+req.body.person_id+' AND is_borrow = 0', function (err, rows, fields) {
        if (!err) {
            console.log('lend: ', rows[0].lend);
            const lend = (rows[0].lend === null ? 0 : rows[0].lend);
            //const qs = rows;
            connection.query('SELECT SUM(sum) as borrow FROM debts WHERE creator_id = '+req.body.creator_id+' AND person_id = '+req.body.person_id+' AND is_borrow = 1', function (err, rows1, fields) {
                if (!err) {
                    console.log('borrow: ', rows1[0].borrow);
                    //const qs = rows;
                    const borrow = (rows1[0].borrow === null ? 0 : rows1[0].borrow);
                    console.log('lend and borrow: '+ lend+' '+borrow);
                    res.send({lend: lend, borrow: borrow});
                }
                else {
                    console.log('Error while performing Query.');
                }
            });
        }
        else {
            console.log('Error while performing Query.');
        }
    });


});



app.post('/takeMoney', (req, res) => {
    //const {token, creator_id, person_id, sum, description, is_borrow} = req.body;
    const newDebt = [req.body.creator_id, req.body.person_id, req.body.sum, req.body.description, req.body.is_borrow];
    console.log('Put: ', newDebt);
    connection.query('INSERT INTO debts (creator_id, person_id, sum, description, is_borrow) VALUES (?, ?, ?, ?, ?)', newDebt, function (err, rows) {
        if (err) {
            console.log('Error while performing Query.');
        }
    });
    res.status(200).send();
});

/*app.post('/login', (req, res) => {
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
});*/

app.post('/close', (req, res) => {
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


app.post('/addcontact', (req, res) => {
    const creator_id = req.body.creator_id;
    const contact_name = req.body.contact_name;
    const newContact = [creator_id, contact_name];
    console.log('Add contact: ', newContact);
    connection.query('INSERT INTO contacts (creator_id, contact_name) VALUES (?, ?)', newContact , function (err, rows) {
        if (err) {
            console.log('Error while performing Query.');
        }
    });
    res.status(200).send();
    //res.redirect('back');
});

module.exports = app;