const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const getCssConfig = require('../../../build/configs/css');
const getResolveConfig = require('../../../build/configs/resolve');
const getFilesConfig = require('../../../build/configs/files');
const settings = require('../settings');
const pkg = require('../package.json');

module.exports = ({ config }) => {
  // Remove other rules than js & md
  config.module.rules = config.module.rules.slice(0, 2); // eslint-disable-line no-param-reassign

  return webpackMerge.smart(
    config,
    getCssConfig(settings),
    getResolveConfig(settings),
    getFilesConfig(settings),
    {
      resolve: {
        modules: [
          path.join(__dirname, '../node_modules'),
          path.join(__dirname, '../ui/node_modules'),
          path.join(__dirname, '../utils/node_modules'),
        ],
      },
      plugins: [
        new webpack.DefinePlugin({
          __VERSION__: JSON.stringify(pkg.version),
        }),
      ],
    },
  );
};
