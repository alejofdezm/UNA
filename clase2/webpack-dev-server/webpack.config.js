const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts', // Archivo principal en TypeScript
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true // Limpia la carpeta dist en cada build
  },
  resolve: {
    extensions: ['.ts', '.js'] // Permite importar archivos sin especificar la extensión
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader', // Transpila TypeScript a JavaScript
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // Genera un HTML basado en este template
    })
  ],
  devServer: {
    static: './dist',  // Sirve los archivos desde la carpeta dist
    hot: true,         // Habilita Hot Module Replacement
    port: 9000         // Puerto de desarrollo
  },
  mode: 'development' // Para desarrollo (cambiar a 'production' en producción)
};
