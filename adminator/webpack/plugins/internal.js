// ------------------
// @Table of Contents
// ------------------

/**
 * + @Loading Dependencies
 * + @Common Plugins
 * + @Merging Production Plugins
 * + @Merging Development Plugins
 * + @Exporting Module
 */


// ---------------------
// @Loading Dependencies
// ---------------------

const
  manifest = require('../manifest'),
  webpack  = require('webpack');


// ---------------
// @Common Plugins
// ---------------

const
  plugins  = [];

plugins.push(
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    Popper: ['popper.js', 'default'],
  })
);


// ----------------------------
// @Merging Development Plugins
// ----------------------------

if (manifest.IS_DEVELOPMENT) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}


// -----------------
// @Exporting Module
// -----------------

module.exports = plugins;
