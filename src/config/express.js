const express = require('express');
const path = require('path');
const compress = require('compression');
const cors = require('cors');

/**
 * Instantiate Express Framework
 * @public
 */
const app = express();

// Gzip Compression
app.use(compress());

// Get API Documentation
app.use('/docs', express.static('docs'));

// Get code coverage report
app.use('./api/v1', require('../api/routes'));

// Cross origin resource sharing
app.use(cors);

module.exports = app;