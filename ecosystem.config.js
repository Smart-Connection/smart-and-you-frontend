module.exports = {
    apps: [
      {
        name: 'Smartfit',
        exec_mode: 'cluster',
        port: '3000',
        instances: 2,
        script: './.output/server/index.mjs',
        args: 'start'
      }
    ]
  }