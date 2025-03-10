module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ["babel-preset-expo", { jsxImportSource: "nativewind" }],
            "nativewind/babel",
        ],
        plugins: [
            'react-native-reanimated/plugin', // Ensure this is added here
          
          [
            "dotenv-import",
            {
              moduleName: "@env",
              path: ".env",
              safe: true,
              allowUndefined: false
            },
          ],
        ],
    };
};
