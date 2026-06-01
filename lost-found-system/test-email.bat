@echo off
echo Testing email configuration...
cd c:\miniproject\lost-found-system
node -e "
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email config error:', error.message);
    console.log('Please check your App Password in .env file');
  } else {
    console.log('✅ Email configuration is valid!');
    console.log('You can now send emails from:', process.env.EMAIL_USER);
  }
});
"
pause