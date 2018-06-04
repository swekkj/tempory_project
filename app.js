var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var test = require('./routes/index');
var indexRouter = require('./routes/login');
var usersRouter = require('./routes/users');
var shopRouter = require('./routes/shop');
var signinRouter = require('./routes/signup');
var cartRouter = require('./routes/cart');
var orderRouter = require('./routes/order');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', indexRouter);
app.use('/users', usersRouter);
app.use('/shop',shopRouter);
app.use('/signup',signinRouter);
app.use('/cart',cartRouter);
app.use('/test',test);
app.use('/order',orderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
