module.exports = {
  apps: [
    {
      name: "hublaw-gpt",
      script: 'dist/index.js',
      watch: '.',
      // instances: 1,
      // autorestart: true,
      // max_memory_restart: '1G',
    },
    // {
    //   script: './service-worker/',
    //   watch: ['./service-worker']
    // }
  ],
  // env: {
  //   NODE_ENV: "development",
  // },
  // env_production: {
  //   NODE_ENV: "production",
  // },

  // deploy : {
  //   production : {
  //     user : 'SSH_USERNAME',
  //     host : 'SSH_HOSTMACHINE',
  //     ref  : 'origin/master',
  //     repo : 'GIT_REPOSITORY',
  //     path : 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': ''
  //   }
  // }
};
