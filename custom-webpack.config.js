var JavaScriptObfuscator = require("webpack-obfuscator");

module.exports = {
  module: {},
  plugins: [
    new JavaScriptObfuscator(
      {
        debugProtection: true,
      },
      ["vendor.js"]
    ),
  ],
};