const app = require('./routes/index').dashboard;
//const auth = require('./routes/index').auth;
//app.use(auth);



app.listen(8081, () => {


    console.log('listening on port 8081');
});
/*const express = require('express');
const dashboard = require('./routes/index').dashboard;
const auth = require('./routes/index').auth;
const app = express();

app.use('/dashboard', dashboard);
app.use('/auth', auth);*/