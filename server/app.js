var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./app/routes/index');
var usersRouter = require('./app/routes/users');
var authRouter = require('./app/routes/auth')
var connectDB = require('./app/connection/database.connection');
var DATABASE_URL = 'mongodb://localhost:27017/' ||process.env.DATABASE_URL 
var cors = require('cors');
var MongoStore = require('connect-mongo');
var session = require('express-session');
var app = express();


// DataBase Connected //
connectDB(DATABASE_URL)


// Session //

var Session_storger = MongoStore.create({
  mongoUrl:DATABASE_URL,
  dbName:'Sulok_task',
  ttl:14*26*60*60,
  autoRemove:'native'
})

// Session Management //

app.use('/login',session({
  secret:"sjdlijhAhujhdJ37kJhsdalkkKjh",
  resave:false,
  saveUninitialized:true,
  store:Session_storger
}))

// Cors //

app.use(cors());


// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth',authRouter);


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
