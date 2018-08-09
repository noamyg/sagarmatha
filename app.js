//ng build --prod --base-href /carloans/front/

// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
// const api = require('./server/routes/api');

const app = express();

const root = '/carloans/front';
const staticFolder = path.join(__dirname, '/dist');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(root, express.static(staticFolder));

// Set our api routes
// app.use('/api', api);

// Catch all other routes and return the index file
app.get(root+'/*', (req, res) => {
  res.sendFile(path.join(staticFolder, '/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '5010';
app.set('port', port);

/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(process.ENV, port, () => console.log(`API running on ${process.ENV}, localhost:${port}`));
