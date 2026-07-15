const BACKEND = 'https://alhendalcompany-001-site9.atempurl.com';

/**
 * Angular CLI / webpack-dev-server proxy.
 * Converts cookie-auth Login redirects into 401 so the SPA never hits CORS on /Login.
 */
module.exports = {
  '/api': {
    target: BACKEND,
    secure: true,
    changeOrigin: true,
    logLevel: 'debug',
    followRedirects: false,
    onProxyRes(proxyRes) {
      const status = proxyRes.statusCode || 0;
      const location = String(proxyRes.headers?.location || '');
      if ((status === 301 || status === 302 || status === 303 || status === 307) && /login/i.test(location)) {
        proxyRes.statusCode = 401;
        proxyRes.statusMessage = 'Unauthorized';
        delete proxyRes.headers.location;
        delete proxyRes.headers.Location;
      }
    },
  },
};
