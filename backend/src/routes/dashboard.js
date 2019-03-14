const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const auth = require('../libs/auth');
//const cookieParser = require('cookie-parser');

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
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(cors());
app.use(morgan('combined'));
const router = express.Router();


app.use(router);



router.post('/login', (req, res) => {
    console.log('user login with jwt');
    let {email, password} = req.body;
    console.log('email = '+email+' password = '+password);

    connection.query('SELECT user_id, login, email FROM users WHERE login = '+email+' AND password = '+password, function (err, rows) {
        if (err) {
            console.log('Error while performing Query.');
        } else {
            console.log('Res of sql = '+JSON.stringify(rows));

            let  data = JSON.stringify(rows);

            if (email === '123' && password === '123') {
                auth.createJWToken({sessionData: data, maxAge: 3600}).then((result) => {
                    //const token = req.token;
                    console.log('after log in created token = '+result);
                    res.status(200).json({success: true, token: result});
                });


            } else {
                res.status(401)
                    .json({
                        message: err || "Validation failed. Given email and password aren't matching."
                    })
            }

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

app.all('*', (req, res, next) =>{
    console.log('there ');
    let token = req.body.token;
    //let token = (req.method === 'POST') ? req.body.token : req.query.token;
    //let token = req.query.token;
    console.log('token = '+token);
    auth.verifyJWTToken(token)
        .then((decodedToken) => {
            console.log('success!!!');
            req.user = decodedToken.data;
            next()
        })
        .catch((err) => {
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

router.get('/', (req, res, next) => {
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


/*app.post('/', (req, res) => {
    const {person_id, sum, description, is_borrow} = req.body;
    const newDebt = [person_id, sum, description, is_borrow];
    console.log('Put: ', newDebt);
    connection.query('INSERT INTO debts (person_id, sum, description, is_borrow) VALUES (?, ?, ?, ?)', newDebt, function (err, rows) {
        if (err) {
            console.log('Error while performing Query.');
        }
    });
    res.status(200).send();
});*/

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

/*app.post('/signup', (req, res) => {
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
*/
module.exports = app;