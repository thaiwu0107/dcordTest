'use strict';

var fs = require('fs');
var path = require('path');
var http = require('http');
var _ = require('lodash');
var cors = require('cors');
var app = require('connect')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var serverPort = 4100;

// swaggerRouter configuration
var options = {
    // swaggerUi: path.join(__dirname, '/swagger.json'),
    // controllers: path.join(__dirname, './controllers'),
    useStubs: true // Conditionally turn on stubs (mock mode)
};

// Get document, or throw exception on error
var spec = '';
try {

    if (process.env['NODE_ENV'] === 'production') {
        // The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
        spec = fs.readFileSync(path.join(__dirname, 'api/swagger.yaml'), 'utf8');
    } else {
        spec = require('./gen').getAllSwagger();
    }

} catch (e) {
    console.error(e);
}

var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
    // Set CORS
    app.use(cors());
    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());

    // Validate Swagger requests
    app.use(middleware.swaggerValidator());

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(options));

    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());

    // Start the server
    http.createServer(app).listen(serverPort, function () {
        console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
        console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
    });
});