/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default {
  env: {
    TELEGRAM_WEB_APP_SCRIPT: 'https://telegram.org/js/telegram-web-app.js',
    MONGODB_URI: process.env.MONGODB_URI,
  },
};
