const
    manifest          = require('../manifest'),
    path              = require('path'),
    cssNext           = require('postcss-preset-env'),
    MiniCssExtractPlugin = require("mini-css-extract-plugin");


// ---------------
// @Common Loaders
// ---------------

const loaders = [
  {
    loader: 'css-loader',
    options: {
      sourceMap : manifest.IS_DEVELOPMENT,
      // minimize  : manifest.IS_PRODUCTION,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: manifest.IS_DEVELOPMENT,
      postcssOptions: {
        plugins: [
          [
            cssNext(),
          ],
        ],
      },
    },
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: manifest.IS_DEVELOPMENT,
      sassOptions: {
        includePaths: [
          path.join('../../', 'node_modules'),
          path.join(manifest.paths.src, 'assets', 'styles'),
          path.join(manifest.paths.src, ''),
        ],
      },
    },
  },
];

const rule = {
  test: /\.scss$/,
  use: [MiniCssExtractPlugin.loader].concat(loaders),
};

// -----------------
// @Exporting Module
// -----------------

module.exports = rule;