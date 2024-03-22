const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer();

// Forward requests to the backend server
app.all('/api/*', (req, res) => {
  proxy.web(req, res, {
    target: 'http://localhost:5000', // Backend server URL
    changeOrigin: true,
  });
});

// Handle errors
proxy.on('error', (err, req, res) => {
  console.error('Proxy error:', err);
  res.status(500).send('Proxy error');
});

// Start the proxy server
const PORT = 3000; // Proxy server port
app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
