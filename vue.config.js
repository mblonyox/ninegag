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
