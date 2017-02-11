const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoExpress = require('mongo-express/middleware');
const mongoExpressConfig = require('./lib/mongo_express_config');
const compression = require('compression');
const path = require('path');
const router = require('./routes/main');

const app = express();

const port = 5000;
const host = '0.0.0.0';

app.use(express.static(path.join(__dirname, '/static')));
app.use('/mongo', mongoExpress(mongoExpressConfig));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'secret with promise',
  cookie: {
    maxAge: 1000 * 60 * 120
  }
}));

app.use(router);
app.listen(port, host, () => {
  console.log(`Node app is running on http://${host}:${port}`);
});
