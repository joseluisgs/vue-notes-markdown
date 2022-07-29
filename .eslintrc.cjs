/* eslint-env node */

module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'vue/require-default-prop': 'off',
    // 'vue/multi-word-component-names': 0, // disable this rule just for views
    // 'vue/script-setup-uses-vars': 'error',
    // 'vue/no-unused-vars': 'error', // Me daba un error temporal, luego quitar
    // 'no-unused-vars': 'error', // Me daba un error temporal
  },
}
