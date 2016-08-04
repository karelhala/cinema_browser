///<reference path="tsd.d.ts"/>
import routeConfig from './config/routeConfig';
import services from './services/loader';
import controllers from './controllers/loader';
import components from './components/loader';
import '../node_modules/ng-webworker/src/ng-webworker';

let app = angular.module('karelHalaCV', ['ngMaterial', 'ngMdIcons', 'ui.router', 'ngAnimate', 'duScroll', 'ngWebworker']);
routeConfig(app);
services(app);
controllers(app);
components(app);
