const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');
module.exports = {
    webpack: async (config) => {
        config.module.rules.push({
            test: /\.ts$/,
            loader: 'ts-loader',
            options: {
                transpileOnly: true,
                appendTsSuffixTo: [/\.vue$/]
            }
        });

        config.module.rules.push({
            test: /\.sass$/,
            use: [
                'vue-style-loader',
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        sassOptions: {
                            indentedSyntax: true
                        }
                    }
                }
            ],
            include: path.resolve(__dirname, '../')
        });

        config.resolve.plugins = config.resolve.plugins || [];
        config.resolve.plugins.push(new TsconfigPathsPlugin({configFile: path.resolve('../tsconfig.json')}));
        return config;
    },
    'stories': [
        '../stories/**/*.stories.mdx',
        '../stories/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    'addons': [
        '@storybook/addon-links',
        '@storybook/addon-docs',
        '@storybook/addon-essentials',
        '@storybook/addon-viewport',
        '@storybook/addon-knobs'
    ]
};
