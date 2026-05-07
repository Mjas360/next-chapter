module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
     [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '~': './src', 
          '@assets': './assets',
        },
      },
    ],
    // 'react-native-worklets/plugin',
    'react-native-reanimated/plugin',
  ],
};
