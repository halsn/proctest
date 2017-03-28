const express = require('express');
const bodyParser = require('body-parser');
const mongoExpress = require('mongo-express/middleware');
const mongoExpressConfig = require('./lib/mongo_express_config');
const expressValidator = require('express-validator');
const compression = require('compression');
const jwt = require('express-jwt');
const path = require('path');
const router = require('./router');

const app = express();

const port = 5000;
const host = '0.0.0.0';

app.use(express.static(path.resolve('./static')));
app.use('/mongo', mongoExpress(mongoExpressConfig));

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(jwt({ secret: 'hellojwt' }).unless({ path: ['/api/login', '/'] }));
app.use(router);
app.use(expressValidator({
  customValidators: {
    isArray(value) {
      return Array.isArray(value);
    },
    isEmailList(value) {
      return value.every(v => expressValidator.validator.isEmail(v));
    }
  },
  customSanitizers: {
    toArray(value) {
      if (Array.isArray(value)) return value;
      else return [value];
    }
  }
}));

app.listen(port, host, () => {
  console.log(`Node app is running on http://${host}:${port}`);
});
