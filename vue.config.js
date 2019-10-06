module.exports = {
  devServer: {
    proxy: {
      ".php": {
        target: "https://9gag.mblonyox.com",
        changeOrigin: true
      }
    }
  }
};
