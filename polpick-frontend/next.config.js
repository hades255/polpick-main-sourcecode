/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const path = require("path");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: process.env.NODE_ENV === "production",
    skipWaiting: true,
    runtimeCaching,
    disable: process.env.NODE_ENV === "development"
  },
  reactStrictMode: false,
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "**"
      },
      {
        protocol: "http",
        hostname: "*",
        port: "",
        pathname: "**"
      }
    ]
  },
  // images: {
  //   domains: ["polpick-ui.dedicateddevelopers.us"]
  // },
  swcMinify: true,
  compress: true,
  optimizeFonts: true,
  devIndicators: {
    autoPrerender: false,
    buildActivityPosition: "bottom-right"
  },
  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === "production"
  },
  env: {
    NEXT_APP_BASE_URL: process.env.NEXT_APP_BASE_URL,
    NEXT_APP_ENCR_KEY: process.env.NEXT_APP_ENCR_KEY,
    NEXT_APP_GAME_FIFTEEN_POOL_ID: process.env.NEXT_APP_GAME_FIFTEEN_POOL_ID,
    NEXT_APP_GAME_THIRTY_POOL_ID: process.env.NEXT_APP_GAME_THIRTY_POOL_ID,
    NEXT_APP_HOMEPAGE: process.env.NEXT_APP_HOMEPAGE,
    NEXT_APP_WALLET_CONNECT_PROJECT_ID:
      process.env.NEXT_APP_WALLET_CONNECT_PROJECT_ID,
    NEXT_APP_WEB3_CLIENT_ID: process.env.NEXT_APP_WEB3_CLIENT_ID,
    NEXT_APP_WEB3_CLIENT_ID_PROD: process.env.NEXT_APP_WEB3_CLIENT_ID_PROD,
    NEXT_APP_GAME_SOCKET: process.env.NEXT_APP_GAME_SOCKET,
    NEXT_APP_ADMIN_SOCKET: process.env.NEXT_APP_ADMIN_SOCKET,
    NEXT_APP_TRADING_SOCKET: process.env.NEXT_APP_TRADING_SOCKET
  },
  typescript: {
    ignoreBuildErrors: false
  },
  eslint: {
    ignoreDuringBuilds: true
  }
});
