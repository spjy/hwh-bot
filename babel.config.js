const presets = [
  [
    '@babel/env',
    {
      useBuiltIns: 'usage',
      corejs: { version: '3.8.2', proposals: true }
    }
  ]
];

module.exports = { presets };
