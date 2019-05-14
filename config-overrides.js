const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = function override(config, env) {
    // do stuff with the webpack config...
    config.plugins.push(new BundleAnalyzerPlugin());
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
    config = rewireLess.withLoaderOptions({
      modifyVars: {"@primary-color": "#FFA500"}, javascriptEnabled: true
    })(config, env)
    return config;
  };

