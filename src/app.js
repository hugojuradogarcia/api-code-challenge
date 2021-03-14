const express = require('express');
const bodyParser = require('body-parser');
const apiErrorHandler = require('./middlewares/apiErrorHandler');
const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('../swagger.json');

// set up express app
const app = express();

// Middlewares
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// Swagger
app.use('/mmi-codechallenge', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

// Initialize routes
const userRoutes = require('./routes/user.route');

// Routes which should handle requests
app.use('/api/v1', userRoutes);
app.get('/', (request, response) => {
    response.json({ info: 'CloudAPPi - Node.js, Express, and Postgres API' })
})


app.use(apiErrorHandler);

module.exports = app;