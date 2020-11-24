const makeAssetBuilder = require('@labor-digital/asset-building/interop/storybook').makeAssetBuilder;

module.exports = {
    stories: ['../stories/**/*.stories.js'],
    webpack: makeAssetBuilder({
        app: {
            extensions: ['@labor-digital/asset-building-env-vuejs']
        }
    }),
    addons: [
        '@storybook/addon-viewport/register',
        '@storybook/addon-knobs/register',
        '@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/addon-docs'
    ]
};
