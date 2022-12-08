/** @type {import('next').NextConfig} */
const withGraphQL = require("next-plugin-graphql");

const nextConfig = withGraphQL({
  reactStrictMode: true,
  swcMinify: true,
})

module.exports = nextConfig

// module.exports = {
//   webpack: (config) => {
//     config.module.rules.push({
//       test: /\.(graphql|gql)$/,
//       exclude: /node_modules/,
//       loader: 'graphql-tag/loader',
//     });
//     return config;
//   },
//   webpackDevMiddleware: (config) => {
//     return config;
//   },
// };