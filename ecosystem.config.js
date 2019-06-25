module.exports = {
  apps: [{
    name: 'esp8266server',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-54-205-131-65.compute-1.amazonaws.com',
      key: '~/.ssh/tutorialkey.pem',
      ref: 'origin/master',
      repo: 'git@github.com:elyhlapetina/esp8266testcode.git',
      path: '/home/ubuntu/esp8266servercode',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
