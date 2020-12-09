const express = require('express');
const cors = require('cors');
const errorhandler = require('errorhandler');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http');
const session = require('express-session');
const dotenv = require('dotenv').config();
const routes = require('./server/routes');
const logger = require('./server/utils/logger')(module);
const {ServerError, ClientError, MongoError} = require('./server/utils/error');

if (dotenv.error) { throw dotenv.error; }

const app = express();

app.use(cors({
  origin: 'http://localhost:8888',
  credentials: true,
}));
const server = http.createServer(app);

app.use(morgan(app.get('env') === 'development' ? 'dev' : 'default'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.json({type: ['application/json', 'text/plain']}));

// goes after cookieParser, when cookies are read and ready
app.use(session({
  key: 'sid',
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    "path": "/",
    "httpOnly": true,
    "maxAge": null,
    "secure": false,
  },
}));

app.use(routes);

if (process.env.NODE_ENV === 'production') {
  app.use(require('stylus').middleware(path.join(__dirname, 'client/build')));
  app.use(express.static(path.join(__dirname, 'client/build')));
  // send the user to index html page inspite of the url
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
  });
}

app.use((req, res) => {
  res.status(404).send('Sorry, page not found');
});
app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    return res.status(err.status).json(err);
  }

  if (err instanceof MongoError) {
    return res.status(err.status).json(err);
  }

  if (err instanceof ServerError) {
    console.log(err.name);
    return res.status(err.status).json(err);
  }

  if (app.get('env') === 'development') {
    const errorHandler = errorhandler();

    errorHandler(err, req, res, next);
  } else {
    res.status(500).end();
  }
});

server.listen(process.env.PORT, () => {
  logger.info(`listening on port ${process.env.PORT}`);
});
