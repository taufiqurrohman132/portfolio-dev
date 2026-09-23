/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tree-shake barrel file react-icons agar modul graph lebih ramping
  experimental: {
    optimizePackageImports: ["react-icons"],
  },
  async headers() {
    return [
      {
        // Media besar di /public: cache harian + SWR supaya repeat visit hemat bandwidth
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig
