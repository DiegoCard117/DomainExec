/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    USER: process.env.USER,
    USER_PASS: process.env.USER_PASS,
  },
};

export default nextConfig;
