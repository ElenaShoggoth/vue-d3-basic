
const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'http://localhost:3000' // Настройка прокси для сервера
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src') // Настройка алиасов для путей
      }
    },
    plugins: [
      new BundleAnalyzerPlugin() // Для анализа сборки
    ]
  },
});
