/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  // Allow static overlay/acta from public/
  async redirects() {
    return [
      { source: '/', destination: '/acta.html', permanent: false },
    ];
  },
};
module.exports = nextConfig;
