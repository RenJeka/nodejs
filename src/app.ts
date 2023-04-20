import 'dotenv/config'
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import http from 'http';
import colors from 'colors';

import config  from './database/config'
import indexRouter from './routes/routes';
import authController from './controllers/auth.controller';
import { normalizePort, onError, onListening } from "./helpers/app.helper";

const app = express();
const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  key: 'todos_cookies_session',
  secret: 'todos_cookies_session_secret',
  store: config.sessionStore,
  resave: false,
  saveUninitialized: false
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('*', authController.checkSession);
app.use('/', indexRouter);

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

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => {
  console.log(colors.italic.bgWhite.green(`Server successfully has been running on port: ${port}`));
});
server.on('error', onError.bind(this, port));
server.on('listening', onListening.bind(this, server));

export default app;
