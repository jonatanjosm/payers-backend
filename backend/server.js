const express = require('express');
const bodyParser = require('body-parser');
const router = require('./network/routes');
require('./config/dbConfig');
const config = require('./config/config');
const cors = require('cors')

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
const whitelist = ['http://localhost:3000'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));

router(app);

app.listen(config.port);
