module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel'], // Ensure nativewind/babel is installed
    ignore: ["**/*.css"], // Exclude CSS files from Babel processing
  };
};
