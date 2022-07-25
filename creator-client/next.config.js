/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://server.beeimp.com:18080/:path*`,
      },
      {
        source: '/data-api/:path*',
        destination: `https://www.juso.go.kr/addrlink/addrLinkApi.do/:path*`,
      },
    ];
  },
  swcMinify: true,
  experimental: {
    emotion:
      true |
      {
        // default is true. It will be disabled when build type is production.
        sourceMap: true,
        // default is 'dev-only'.
        autoLabel: 'never' | 'dev-only' | 'always',
        // default is '[local]'.
        // Allowed values: `[local]` `[filename]` and `[dirname]`
        // This option only works when autoLabel is set to 'dev-only' or 'always'.
        // It allows you to define the format of the resulting label.
        // The format is defined via string where variable parts are enclosed in square brackets [].
        // For example labelFormat: "my-classname--[local]", where [local] will be replaced with the name of the variable the result is assigned to.
        // labelFormat: string,
      },
  },
  eslint: {
    dirs: ['components', 'pages', 'utils'],
  },
};

module.exports = nextConfig;
