// ---------------------
// @Loading Dependencies
// ---------------------

const
    path = require('path'),
    manifest = require('./manifest'),
    rules = require('./rules'),
    plugins = require('./plugins');
    CopyWebpackPlugin = require('copy-webpack-plugin');


// ------------------
// @Entry Point Setup
// ------------------

const
    entry = [
        path.join(manifest.paths.src, 'assets', 'scripts', manifest.entries.js),
    ];

const fs = require('fs');
let bundlesFile = path.join(manifest.paths.src, '..', 'bundles.json');
try {
    if (fs.existsSync(bundlesFile)) {
        let bundles = require(bundlesFile);
        for (const bundle of Object.values(bundles.bundles)) {
            let entryName = bundle + '/Resources/adminator/index.js';
            let staticDir = bundle + '/Resources/adminator/static';
            if (fs.existsSync(entryName)) {
                entry.push(entryName);
            }
            if (fs.existsSync(staticDir)) {
                plugins.push(new CopyWebpackPlugin({
                    patterns: [
                        {
                            from: staticDir,
                            to: path.join(manifest.paths.build, 'assets/static'),
                        },
                    ]
                }));
            }
        }
    }
} catch (err) {
    console.error(err);
}


// ---------------
// @Path Resolving
// ---------------

const resolve = {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js'],
    modules: [
        path.join(__dirname, '../node_modules'),
        path.join(manifest.paths.src, ''),
    ],
};


// -----------------
// @Exporting Module
// -----------------

module.exports = {
    devtool: manifest.IS_PRODUCTION ? false : 'source-map',
    context: path.join(manifest.paths.src, manifest.entries.js),
    entry,
    mode: manifest.NODE_ENV,
    output: {
        path: manifest.paths.build,
        publicPath: '/admin/build/',
        filename: manifest.outputFiles.bundle,
    },
    module: {
        rules,
    },
    performance: {
        hints: false,
    },
    resolve,
    plugins,
};