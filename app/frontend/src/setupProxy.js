const { createProxyMiddleware } = require('http-proxy-middleware');

const options = {
    target: `http://${process.env.REACT_APP_PROXY_HOST}:5500`,
    pathRewrite: { '^/api': '' },
    changeOrigin: true,
};

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware(options)
  );
};