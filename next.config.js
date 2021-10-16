const withPWA = require('next-pwa')

module.exports = withPWA({
  webpack: (config, { dev, isServer }) => {
    if (isServer) {
      require('./scripts/generateSiteMapXML')
    }

    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat'
      })
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
