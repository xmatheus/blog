const withPWA = require('next-pwa')

module.exports = withPWA({
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./scripts/generateSiteMapXML')
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    return config
  },
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public'
  }
})

// module.exports = {
//   webpack: (config, { isServer }) => {
//     // if (isServer) {
//     //   require('./scripts/generateSiteMapXML')
//     // }

//     config.module.rules.push({
//       test: /\.svg$/,
//       use: ['@svgr/webpack']
//     })

//     return config
//   }
// }
