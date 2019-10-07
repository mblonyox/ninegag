module.exports = {
  devServer: {
    proxy: {
      ".php": {
        target: "https://9gag.mblonyox.com",
        changeOrigin: true
      }
    }
  },
  pwa: {
    iconPaths: {
      favicon32: 'img/icons/icon-32x32.png',
      favicon16: 'img/icons/icon-16x16.png',
      appleTouchIcon: 'img/icons/icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/icon-144x144.png'
    },
    themeColor: "#212529",
    workboxOptions: {
      exclude: [
        /\.map$/,
        /img\/icons\//,
        /favicon\.ico$/,
        /manifest\.json$/,
        /\.php$/
      ]
    }
  }
};
