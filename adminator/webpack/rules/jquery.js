module.exports = {
    rules: [{
        test: require.resolve('jquery'),
        use: [{
            loader: 'expose-loader',
            options: {
                exposes: ["$", "jQuery"]
            }
        }]
    }]
};
