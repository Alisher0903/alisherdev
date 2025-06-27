const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js"],
  eslint: {
    dirs: ["src"],
  },
  experimental: {
    // Enable modern features for better performance
    optimizeCss: true,
    scrollRestoration: true,
    legacyBrowsers: false,
    browsersListForSwc: true,
  },
  images: {
    domains: ["flagcdn.com"], // Remove https:// from domains
    formats: ["image/avif", "image/webp"], // Modern image formats
    minimumCacheTTL: 31536000, // 1 year cache
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Enable placeholder for better UX
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Optimize fonts
  optimizeFonts: true,
  // Compression
  compress: true,
  // Generate ETags for better caching
  generateEtags: true,
  // Power optimization for mobile devices
  poweredByHeader: false,
  // Security headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: "/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache images for better performance
      {
        source: "/:path*\\.(ico|png|jpg|jpeg|gif|webp|avif|svg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  webpack: (config, { dev, isServer }) => {
    // SVG optimization
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    // Fallbacks for server-side rendering
    config.resolve.fallback = {
      fs: false,
      net: false,
      dns: false,
      child_process: false,
      tls: false,
    };

    // Production optimizations
    if (!dev && !isServer) {
      // Tree shaking for framer-motion
      config.resolve.alias = {
        ...config.resolve.alias,
        "framer-motion": "framer-motion/dist/framer-motion",
      };

      // Minimize bundle size
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }

    // Optimize chunks
    if (!dev) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunks for better caching
          vendor: {
            name: "vendor",
            chunks: "all",
            test: /node_modules/,
            priority: 20,
          },
          // Common chunks
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
          // Framework chunks
          framework: {
            chunks: "all",
            name: "framework",
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          // Animation library chunk
          animations: {
            chunks: "all",
            name: "animations",
            test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
            priority: 30,
            enforce: true,
          },
        },
      };
    }

    return config;
  },
});

module.exports = nextConfig;
