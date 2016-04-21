// npm
import 'lodash';

// * ionic.bundle.js is a concatenation of:
// * ionic.js, angular.js, angular-animate.js,
// * angular-sanitize.js, angular-ui-router.js,
// * and ionic-angular.js

// import 'lib/ionic/css/ionic.min.css';
import 'lib/ionic/js/ionic.js';

import angular from 'angular';
import angularAnimate from 'angular-animate';
import angularSanitize from 'angular-sanitize';
import uiRouter from 'angular-ui-router';

import 'lib/ionic/js/ionic-angular.js';

// config
// import routeConfig from './config/route.js';

import screens from './screens/index.js';
// import components from './components/index.js'
// import services from './services/index.js';

// style
import styles from 'index.scss';

function onAppStart ($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}

const deps = [
  // angularAnimate,
  // angularSanitize,
  // uiRouter,
  'ionic',
  screens
  // components,
  // services
];


export default angular.module('ng-starter', deps)
  .value('config', {})
  // .config(routeConfig)
  .run(onAppStart, onAppStart);

angular.bootstrap(document.body, ['ng-starter']);
