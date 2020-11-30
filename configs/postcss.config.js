module.exports = {
  plugins: [
    'css-mqpacker',
    [
      'postcss-preset-env',
      {
        stage: 3,
        features: {
          'custom-media-queries': true,
        },
      }
    ],
  ]
}
