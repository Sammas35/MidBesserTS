System.config({
  baseURL: './',
  defaultJSExtensions: false,
  transpiler: 'typescript',
  paths: {
    'bower:*': 'component/*'
  },

  packages: {
    'app': {defaultExtension: 'ts'}
  },

  map: {
    'angular': 'bower:angular/angular.js',
    'angular-route': 'bower:angular-route/angular-route.js',
    'jquery': 'bower:jquery/dist/jquery.js',
    'typescript': 'bower:typescript/lib/typescript.js',

    /* only necessary for tests */
    'angular-mocks': 'bower:angular-mocks/angular-mocks.js',
    'systemjs': 'bower:systemjs/dist/system.js',
    'system-polyfills': 'bower:systemjs/dist/system-polyfills.js',
    'es6-module-loader': 'bower:es6-module-loader/dist/es6-module-loader.js'
  },

  meta: {
    'angular': {
      format: 'global',
      exports: 'angular',
      deps: ['jquery']
    },
    'angular-route': {
      format: 'global',
      deps: ['angular']
    },
    'jquery': {
      format: 'global',
      exports: 'jQuery'
    },

    /* tests */
    'angular-mocks': {
      format: 'global',
      exports: 'angular',
      deps: ['angular']
    }
  }
});
