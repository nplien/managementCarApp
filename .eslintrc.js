module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        '@react-native-community',
        'prettier',
        'prettier/react',
        'plugin:prettier/recommended',
        'eslint-config-prettier'
    ],
    plugins: [
        'react',
        'jsx-a11y',
        'import',
        'eslint-plugin-prettier',

        'eslint-plugin-react',
        '@typescript-eslint'
    ],
    rules: {
        'no-restricted-globals': ['off'],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'import/prefer-default-export': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx', 'json'] }],
        'react/prefer-stateless-function': [0],
        'react/jsx-indent': [0],
        'react/sort-comp': [0],
        'react/destructuring-assignment': [0],
        'react/forbid-prop-types': [0],
        'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
        quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
        'jsx-quotes': ['error', 'prefer-double'],
        camelcase: 'off',
        'no-use-before-define': 'off',
        semi: ['error', 'always'],
        'prettier/prettier': [
            'error',
            {
                trailingComma: 'none',
                singleQuote: true,
                jsxSingleQuote: false,
                printWidth: 100,
                semi: true,
                jsxBracketSameLine: true,
                endOfLine: 'auto'
            }
        ]
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.json', '.native.js', '.ts', '.tsx']
            }
        }
    },
    env: {
        jest: true,
        es6: true,
        node: true
    },
    globals: {
        __DEV__: true,
        fetch: true,
        console: true,
        require: true,
        isNaN: true,
        isFinite: true
    }
};