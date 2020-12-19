module.exports = {
  apps: [{
    name: 'frontend',
    script: 'server.js',
    instances: 3,
    autorestart: true,
    watch: false,
    max_memory_restart: '512M',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
