module.exports = {
  stylesFolder: '/styles',
  sourceFolder: '/src',
  distFolder: '/dist',
  javascriptFolder: 'js',
  stylesheetFolder: 'css',
  appName: 'karel-hala-cv',
  bowerLibs: 'libs/',
  nodePackages: 'node_modules/',
  get stylesheetPath() {
    return this.distFolder + '/' + this.stylesheetFolder + '/[name]' + '.css';
  },
  isMinified: function (production) {
    return (!production ? '.js' : '.min.js');
  },
  get sassEntryPoint() {
    return '.' + this.sourceFolder + this.stylesFolder + '/' + this.appName + '.scss'
  },
  get tsEntryPoint() {
    return '.' + this.sourceFolder + '/index.ts'
  },
  get outputFolder() {
    return __dirname
  }
};
