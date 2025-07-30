module.exports = {
  apps: [
    {
      name: 'sargen_frontend',
      script: './.next/standalone/server.js',
      cwd: '/var/www/sargen_frontend',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
