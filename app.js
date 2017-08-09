/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const sass = require('node-sass-middleware');
const fs = require('fs');
const papaparse = require('papaparse');
const grid = require('gridfs-stream');
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, 'uploads') });
// const expressVue = require('express-vue');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env.example' });

/**
 * Routers
 */
const primary = require('./routes/primary');
const oauth = require('./routes/oauth');
const dashboard = require('./routes/dashboard');
const discovery = require('./routes/discovery');
const formulations = require('./routes/formulations');
const formulationConfigurations = require('./routes/formulationConfigurations');
const datasources = require('./routes/datasources');
const systemsModels = require('./routes/systemsModels');
const systemsModelConfigurations = require('./routes/systemsModelConfigurations');
const information = require('./routes/information');
// const apis = require('./routes/apis');

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');  // default.

/**
 * Trying to integrate Vue.js - Not Working correctly yet.
 */
// app.engine('vue', expressVue);
// app.set('view engine', 'vue');
// app.set('views', path.join(__dirname, 'views'));
// app.set('vue', {
//     // ComponentsDir is optional if you are storing your components in a different directory than your views
//     componentsDir: __dirname + '/views/components',
//     // Default layout is optional it's a file and relative to the views path, it does not require a .vue extension.
//     // If you want a custom layout set this to the location of your layout.vue file.
//     defaultLayout: 'layout'
// });

// Express Status Monitor must precede any other middleware. Provides it's own route to '/status'.
app.use(expressStatusMonitor());
app.use(compression());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
    autoReconnect: true,
    clear_interval: 3600
    // Any advanced mongodb configs should go here.
    // Examples:
    //  stringify   (if using unsupported types)
    //  serialize   (modify session before writing out)
    //  unserialize (modify session before using in app)
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  if (req.path === '/api/upload') {
    next();
  } else {
    lusca.csrf()(req, res, next);
  }
});
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (!req.user &&
      req.path !== '/login' &&
      req.path !== '/signup' &&
      !req.path.match(/^\/auth/) &&
      !req.path.match(/\./)) {
    req.session.returnTo = req.path;
  } else if (req.user &&
      req.path == '/account') {
    req.session.returnTo = req.path;
  }
  next();
});
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

// Path for using node_moduels in view templates.
app.use('/scripts', express.static(path.join(__dirname, '/node_modules')));

/**
 * Routes
 */
app.use('/', primary);
app.use('/auth', oauth);
app.use('/dashboard', dashboard);
app.use('/discovery', discovery);
app.use('/formulations', formulations);
app.use('/formulation-configurations', formulationConfigurations);
app.use('/systems-models', systemsModels);
app.use('/systems-model-configurations', systemsModelConfigurations);
app.use('/datasources', datasources);
app.use('/information', information);
// app.use('/api', apis);
// app.get('/vue-test', vueTestController.index);

/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env')); 
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
