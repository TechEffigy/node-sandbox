const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const config = require('./config');
const disco = require('./helpers/disco');

mongoose.Promise = global.Promise;
mongoose.connect(config.dbHost);
const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(config.jwtSecret));
require('./passport-middleware')(app);

// Routes
app.use('/users', require('./routes/users'));

// 404 handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;

  res.status(status).json({ error });
});

// Start Server
const port = process.env.PORT || 8081;
app.listen(port);
disco.status(`Server(${app.get('env')}) is listening at ${port}`);
