/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://bibliotheque-web-production.up.railway.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
