const manifest = require('../manifest');

const plugins = [];

plugins.push(
  ...(require('./internal')),
  require('./extractPlugin')
);

if (manifest.IS_DEVELOPMENT) {
  plugins.push(require('./dashboardPlugin'));
}

module.exports = plugins;
