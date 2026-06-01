const required = [
  'MONGODB_URI',
  'JWT_SECRET',
  'EMAIL_USER',
  'EMAIL_PASSWORD'
];

const missing = required.filter(k => !process.env[k]);
if (missing.length) {
  console.error('❌ Missing required environment variables:', missing.join(', '));
  console.error('Please set them in your environment or in .env before starting the server. See .env.example');
  process.exit(1);
}

module.exports = true;
