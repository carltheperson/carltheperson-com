const getPostsList = require("./utils/postListGenerator").getPostsList;

module.exports = {
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
  env: {
    posts: getPostsList(),
  },
};
