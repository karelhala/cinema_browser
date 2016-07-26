const settings = require('./application-settings.js');
var webpack = require('webpack'),
  path = require('path'),
  production = process.argv.indexOf('--production') !== -1,
  NgAnnotatePlugin = require('ng-annotate-webpack-plugin'),
  BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  spa = require('browser-sync-spa'),
  appEntry = {},
  plugins = [
    new HtmlWebpackPlugin({
      title: 'Cinema browser',
      template: 'src/template-index.ejs', // Load a custom template
      inject: 'body'
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 4000,
      server: {baseDir: [__dirname]}
    }, {
      use: spa({
        selector: '[ng-app]'
      })
    }),
    new webpack.optimize.CommonsChunkPlugin(
      settings.appName,
      settings.distFolder + '/' + settings.javascriptFolder + '/' + settings.appName + settings.isMinified(production)
    ),
    new ExtractTextPlugin(settings.stylesheetPath),
    new NgAnnotatePlugin({add: true})
  ];

if(production){
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.OccurenceOrderPlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin({warnings: false, minimize: true, drop_console: true}));
}

appEntry[settings.appName] = [
  settings.sassEntryPoint,
  settings.tsEntryPoint,
  '.' + settings.sourceFolder + settings.stylesFolder + '/' + 'timeline.scss'
];
module.exports = {
  context: __dirname,
  entry: appEntry,
  output: {
    path: settings.outputFolder,
    publicPath: '.',
    filename: settings.distFolder + '/' + settings.javascriptFolder + "/[name]" + settings.isMinified(production)
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  stats: {
    colors: true,
    reasons: true
  },
  devtool: !production && 'source-map',
  module: {
    preLoaders: [
      {test: /\.ts$/, loader: 'tslint', exclude: /(node_modules|libs)/}
    ],
    loaders: [
      {test: /\.ts$/, loaders: ['ts-loader'], exclude: /(node_modules|libs)/},
      {test: /\.html$/, loader: 'raw', exclude: /(node_modules|libs|dist|tsd|bower)/},
      // stylesheets
      {test: /\.scss/, exclude: /(node_modules|lib)/, loader: ExtractTextPlugin.extract('style-loader',
        'css-loader!sass-loader')},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
      {test: /\.(png|jpg|gif|svg|woff|ttf|eot)/, loader:  'url-loader?limit=20480'}
      // inline images/fonts less than  20Kb otherwise file-loader is used
    ]
  },
  plugins: plugins,
  externals: {
    'angular': 'angular',
    'moment': 'moment'
  }
};
