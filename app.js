var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cartRouter = require('./routes/cart_router');
var indexRouter = require('./routes/index_router');
var loginRouter = require('./routes/login_router');
var productRouter = require('./routes/product_router');
var registerRouter = require('./routes/register_router');
var searchRouter = require('./routes/search_router');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/cart', cartRouter)
app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/login', loginRouter)
app.use('/product', productRouter)
app.use('/register', registerRouter)
app.use('/products', searchRouter);

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