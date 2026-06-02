module.exports = {
  apps: [
    {
      name: 'school-erp-api',
      script: 'dist/main.js',
      cwd: '/opt/school-erp/backend',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
      },
      error_file: '/var/log/school-erp/api-error.log',
      out_file: '/var/log/school-erp/api-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      merge_logs: true,
    },
  ],
};
