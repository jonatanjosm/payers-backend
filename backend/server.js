const express = require('express');
const bodyParser = require('body-parser');
const router = require('./network/routes');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

router(app);

app.listen(3000);
