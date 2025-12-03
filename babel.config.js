// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // Tell Expo’s preset to use NativeWind’s JSX transform
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      // Add NativeWind as a *preset*, not a plugin
      "nativewind/babel",
    ],
    // No plugins needed here for expo-router on SDK 54
    plugins: [],
  };
};
