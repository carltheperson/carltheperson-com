const getPostsData = require("./utils/post-data-generator").getPostsData;

module.exports = {
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
  env: {
    posts: getPostsData(),
  },
};
