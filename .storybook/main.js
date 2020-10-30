module.exports = {
    stories: ['../stories/**/*.stories.js'],
    addons: [
        {
            name: '@labor-digital/asset-building/interop/storybook',
            options: {
                app: {
                    extensions: ['@labor-digital/asset-building-env-vuejs']
                }
            }
        },
        '@storybook/addon-viewport/register',
        '@storybook/addon-knobs/register',
        '@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/addon-docs'
    ]
};
