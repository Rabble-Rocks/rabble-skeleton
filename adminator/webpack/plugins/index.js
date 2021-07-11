const
  manifest          = require('../manifest');

const plugins = [];

plugins.push(
  require('./imageminPlugin'),
  ...(require('./internal')),
  require('./caseSensitivePlugin'),
  require('./extractPlugin'),
  require('./copyPlugin')
);

if (manifest.IS_DEVELOPMENT) {
  plugins.push(require('./dashboardPlugin'));
}

module.exports = plugins;
