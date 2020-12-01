module.exports = (api) => {
  // Cache configuration is a required option
  api.cache(false);

  const presets = [
    '@babel/preset-typescript',
    '@babel/preset-env',
  ];
  const plugins = [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
  ];

  return {presets, plugins};
};
