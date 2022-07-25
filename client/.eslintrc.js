module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 13,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint"
  ],
  "rules": {
    'object-curly-spacing': ["error", "always"],
    "indent": ["error", 2],
    'no-console': 1,
    'comma-dangle': 2,
  
    'react/react-in-jsx-scope': 0,
    'arrow-body-style': 0,
    'implicit-arrow-linebreak': 2,
    'no-multiple-empty-lines': ["error", { "max": 1, "maxEOF": 0 }]
    
    // 'object-curly-newline': 2,
  }
};
