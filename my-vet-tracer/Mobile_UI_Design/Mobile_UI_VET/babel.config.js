module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "@babel/plugin-transform-class-properties",
      { loose: true }, // Đồng bộ chế độ loose
    ],
    [
      "@babel/plugin-transform-private-methods",
      { loose: true }, // Đồng bộ chế độ loose
    ],
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
};
