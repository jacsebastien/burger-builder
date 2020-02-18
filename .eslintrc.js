module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        "amd": true,
        "jest": true
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
            4,
            { "SwitchCase": 1 }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'no-console': 'off',
        'linebreak-style': 'off',
        'react/no-unescaped-entities': 'off',
        'react/prop-types': 'off',
        'react/display-name': 'off',
        'no-unused-vars': 'warn'
    }
};
