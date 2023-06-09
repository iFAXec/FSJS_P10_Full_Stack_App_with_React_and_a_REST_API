'use strict';

// load modules
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const { sequelize } = require('./models');


(async () => {
  try {

    //Testing connection with the database 
    await sequelize.authenticate();
    console.log('Connection to the database successful!');

    //Sync the models
    await sequelize.sync();
    console.log('Synchronising the models with the database...');

  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();
app.use(cors());

// Setup request body JSON parsing.
app.use(express.json());

app.use('/api', routes);

// setup morgan which gives us http request logging
app.use(morgan('dev'));



// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
