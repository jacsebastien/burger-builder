module.exports = {
    'env': {
        'browser': true,
        'es6': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    "parser": "babel-eslint",
    'plugins': [
        'react'
    ],
    'rules': {
        'indent': [
            'warn',
            4
        ],
        'quotes': [
            'warn',
            'single'
        ],
        'semi': [
            'warn',
            'always'
        ],
        'linebreak-style': 'off',
        'react/no-unescaped-entities': 'off',
        'react/prop-types': 'off',
        "no-unused-vars": "warn"
    }
};
