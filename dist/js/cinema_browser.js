/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = ".";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(5);
	module.exports = __webpack_require__(47);


/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="tsd.d.ts"/>
	var routeConfig_1 = __webpack_require__(6);
	var loader_1 = __webpack_require__(9);
	var loader_2 = __webpack_require__(16);
	var loader_3 = __webpack_require__(18);
	var app = angular.module('karelHalaCV', ['ngMaterial', 'ngMdIcons', 'ui.router', 'ngAnimate', 'duScroll']);
	routeConfig_1.default(app);
	loader_1.default(app);
	loader_2.default(app);
	loader_3.default(app);


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../tsd.d.ts"/>
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    module
	        .config(["$stateProvider", "$locationProvider", "$urlRouterProvider", function ($stateProvider, $locationProvider, $urlRouterProvider) {
	        $stateProvider.state('home', {
	            views: {
	                toolbar: {
	                    template: __webpack_require__(7),
	                    controller: 'basicInformationController as basic'
	                },
	                content: {
	                    template: __webpack_require__(8)
	                }
	            }
	        });
	        $urlRouterProvider.otherwise('/');
	        $locationProvider.html5Mode({
	            enabled: false,
	            requireBase: false
	        });
	    }])
	        .run(["$state", function ($state) {
	        $state.go('home');
	    }]);
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "<div ng-controller=\"basicInformationController as basic\">\r\n  <div class=\"md-toolbar-tools\" layout=\"row\" layout-align=\"center center\" >\r\n    <cc-trigger activate=\"basic.activateDatePicker\"\r\n                event-name=\"click\"\r\n                element-name=\"button\">\r\n      <md-datepicker\r\n        ng-model=\"basic.cinemaDate\"\r\n        md-placeholder=\"Enter date\"\r\n        class=\"cc-toolbar-item cc-datepicker\"\r\n        md-min-date=\"basic.minDate\"\r\n        ng-change=\"basic.dateChanged()\">\r\n      </md-datepicker>\r\n    </cc-trigger>\r\n\r\n    <cc-select\r\n      select-items=\"basic.items\"\r\n      label=\"basic.label\"\r\n      on-change=\"basic.onCinemaSelect(item)\"\r\n      class=\"cc-toolbar-item\"\r\n      cc-trigger\r\n      activate=\"basic.activateSelect\"\r\n      event-name=\"click\"\r\n      element-name=\"md-select\"\r\n    ></cc-select>\r\n  </div>\r\n</div>\r\n"

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "<div>\r\n  <div class=\"md-whiteframe-3dp cv-content cc-selected\"\r\n       id=\"selected-data\"\r\n       layout=\"row\"\r\n       layout-align=\"center center\"\r\n       ng-controller=\"basicInformationController as basic\">\r\n    <h1>Zobrazuji filmy v kině\r\n      <a ng-click=\"basic.onCinemaClicked()\">{{basic.getSelectedItem()? basic.getSelectedItem().text : 'vše'}}</a>,\r\n      pro datum <a ng-click=\"basic.onDateClicked()\">{{basic.getSelectedDate() ? basic.getSelectedDate() : 'vše'}}</a></h1>\r\n  </div>\r\n  <div class=\"md-whiteframe-3dp cv-content cv-timeline-trend\" id=\"timeline-trend\" layout=\"column\">\r\n    asdf\r\n  </div>\r\n</div>\r\n"

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../tsd.d.ts"/>
	var basicInformationLoader_1 = __webpack_require__(10);
	var timelineLoader_1 = __webpack_require__(11);
	var contactLoader_1 = __webpack_require__(13);
	var jobsLoader_1 = __webpack_require__(14);
	var schoolLoader_1 = __webpack_require__(15);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    module.service('basicInformationLoader', basicInformationLoader_1.default);
	    module.service('timelineLoader', timelineLoader_1.default);
	    module.service('contactLoader', contactLoader_1.default);
	    module.service('jobsLoader', jobsLoader_1.default);
	    module.service('schoolLoader', schoolLoader_1.default);
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	///<reference path="../tsd.d.ts"/>
	var BasicInformationLoader = (function () {
	    /* @ngInject */
	    function BasicInformationLoader($http) {
	        this.$http = $http;
	        this.allCinemas = {};
	        this.informationSubject = new Rx.Subject();
	    }
	    BasicInformationLoader.$inject = ["$http"];
	    BasicInformationLoader.prototype.getCinemas = function () {
	        var _this = this;
	        return this.loadCinemas().then(function (allCinemas) {
	            _this.allCinemas = allCinemas;
	            return _this.allCinemas;
	        });
	    };
	    BasicInformationLoader.prototype.loadCinemas = function () {
	        return this.$http.get('data/basic_info.json').then(function (responseData) {
	            return responseData.data;
	        });
	    };
	    BasicInformationLoader.prototype.sendNext = function (data) {
	        this.informationSubject.onNext(data);
	    };
	    return BasicInformationLoader;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = BasicInformationLoader;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../tsd.d.ts"/>
	var moment = __webpack_require__(12);
	var TimelineLoader = (function () {
	    /* @ngInject */
	    function TimelineLoader($http) {
	        this.$http = $http;
	        this.timelineData = {};
	    }
	    TimelineLoader.$inject = ["$http"];
	    TimelineLoader.prototype.getTimelineData = function () {
	        var _this = this;
	        if (this.timelineData.length > 0) {
	            return this.timelineData;
	        }
	        else {
	            return this.loadTimelineObject().then(function (timelineData) {
	                angular.forEach(timelineData, function (oneRecord) {
	                    _this.fillObject(oneRecord);
	                });
	                _this.timelineData = timelineData;
	                return _this.timelineData;
	            });
	        }
	    };
	    TimelineLoader.prototype.fillObject = function (record) {
	        record.isVisible = false;
	        record.timeObject = moment(record.time);
	        record.getTime = function () {
	            var timeString = '';
	            record.diffTime = moment.duration(moment().diff(record.time));
	            if (record.diffTime.years() !== 0) {
	                timeString += record.diffTime.years() + ' years ';
	            }
	            if (record.diffTime.months() !== 0) {
	                timeString += record.diffTime.months() + ' months ';
	            }
	            if (record.diffTime.days() !== 0) {
	                if (timeString.length !== 0) {
	                    timeString += 'and ';
	                }
	                timeString += record.diffTime.days() + ' days ';
	            }
	            timeString += 'ago';
	            return timeString;
	        };
	    };
	    TimelineLoader.prototype.loadTimelineObject = function () {
	        return this.$http.get('/data/timeline.json').then(function (responseData) {
	            return responseData.data;
	        });
	    };
	    return TimelineLoader;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = TimelineLoader;


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = moment;

/***/ },
/* 13 */
/***/ function(module, exports) {

	///<reference path="../tsd.d.ts"/>
	"use strict";
	var ContactLoader = (function () {
	    /* @ngInject */
	    function ContactLoader($http) {
	        this.$http = $http;
	        this.contactData = [];
	    }
	    ContactLoader.$inject = ["$http"];
	    ContactLoader.prototype.getContactData = function () {
	        if (this.contactData.length > 0) {
	            return this.contactData;
	        }
	        else {
	            return this.loadContactData();
	        }
	    };
	    ContactLoader.prototype.loadContactData = function () {
	        return this.$http.get('/data/contact.json').then(function (responseData) {
	            return responseData.data;
	        });
	    };
	    return ContactLoader;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ContactLoader;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../tsd.d.ts"/>
	var moment = __webpack_require__(12);
	var JobsLoader = (function () {
	    /* @ngInject */
	    function JobsLoader($http) {
	        this.$http = $http;
	        this.jobsData = {};
	    }
	    JobsLoader.$inject = ["$http"];
	    JobsLoader.prototype.getJobsData = function () {
	        var _this = this;
	        if (this.jobsData.length > 0) {
	            return this.jobsData;
	        }
	        else {
	            return this.loadJobsObject().then(function (jobsData) {
	                _this.jobsData.data = jobsData;
	                _this.fillObject(jobsData);
	                return _this.jobsData;
	            });
	        }
	    };
	    JobsLoader.prototype.fillObject = function (record) {
	        var _this = this;
	        this.jobsData.graphData = {
	            colors: {},
	            type: '',
	            data: [],
	            names: {}
	        };
	        angular.forEach(record, function (oneJob) {
	            _this.jobsData.graphData.colors[oneJob.id] = oneJob.color;
	            _this.jobsData.graphData.names[oneJob.id] = oneJob.name;
	            var data = moment.duration(moment(oneJob.outTime).diff(moment(oneJob.inTime)));
	            _this.jobsData.graphData.data.push([oneJob.id, Math.round(data.asMonths())]);
	        });
	    };
	    JobsLoader.prototype.loadJobsObject = function () {
	        return this.$http.get('/data/jobs.json').then(function (responseData) {
	            return responseData.data;
	        });
	    };
	    return JobsLoader;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = JobsLoader;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../tsd.d.ts"/>
	var moment = __webpack_require__(12);
	var SchoolLoader = (function () {
	    /* @ngInject */
	    function SchoolLoader($http) {
	        this.$http = $http;
	        this.schoolData = {};
	    }
	    SchoolLoader.$inject = ["$http"];
	    SchoolLoader.prototype.getJobsData = function () {
	        var _this = this;
	        if (this.schoolData.length > 0) {
	            return this.schoolData;
	        }
	        else {
	            return this.loadSchoolsObject().then(function (schoolData) {
	                _this.schoolData.data = schoolData;
	                _this.fillObject(schoolData);
	                return _this.schoolData;
	            });
	        }
	    };
	    SchoolLoader.prototype.fillObject = function (record) {
	        var _this = this;
	        this.schoolData.graphData = {
	            colors: {},
	            type: '',
	            data: [],
	            names: {}
	        };
	        angular.forEach(record, function (oneChool) {
	            _this.schoolData.graphData.colors[oneChool.id] = oneChool.color;
	            _this.schoolData.graphData.names[oneChool.id] = oneChool.name;
	            var data = moment.duration(moment(oneChool.outTime).diff(moment(oneChool.inTime)));
	            _this.schoolData.graphData.data.push([oneChool.id, Math.round(data.asMonths())]);
	        });
	    };
	    SchoolLoader.prototype.loadSchoolsObject = function () {
	        return this.$http.get('/data/schools.json').then(function (responseData) {
	            return responseData.data;
	        });
	    };
	    return SchoolLoader;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = SchoolLoader;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../tsd.d.ts"/>
	var basicInformationControler_1 = __webpack_require__(17);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    module.controller('basicInformationController', basicInformationControler_1.default);
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../tsd.d.ts"/>
	var moment = __webpack_require__(12);
	var BasicInformationController = (function () {
	    /* @ngInject */
	    function BasicInformationController($window, basicInformationLoader, $scope, $http) {
	        var _this = this;
	        this.$window = $window;
	        this.basicInformationLoader = basicInformationLoader;
	        this.$scope = $scope;
	        this.$http = $http;
	        this.direction = 'down';
	        this.activateSelect = false;
	        this.activateDatePicker = false;
	        console.log(this);
	        this.minDate = new Date();
	        this.label = 'Kino';
	        basicInformationLoader.getCinemas().then(function (items) { return _this.items = items; });
	        var worker = new Worker('src/worker.js');
	        worker.onmessage = function (e) {
	            console.log(e);
	        };
	        worker.postMessage('');
	        this.basicInformationLoader.informationSubject.subscribe(function (data) {
	            if (data.hasOwnProperty('clicked')) {
	                _this.activateSelect = data.clicked === 'cinema';
	                _this.activateDatePicker = data.clicked === 'date';
	                setTimeout(function () {
	                    _this.activateSelect = false;
	                    _this.activateDatePicker = false;
	                });
	            }
	        }, function () { }, function () { });
	    }
	    BasicInformationController.$inject = ["$window", "basicInformationLoader", "$scope", "$http"];
	    BasicInformationController.prototype.scrollToElement = function (item) {
	        if (item.scrollTo) {
	            var element = angular.element(document.getElementById(item.scrollTo));
	            this.container.scrollToElementAnimated(element, 0, 400);
	        }
	    };
	    BasicInformationController.prototype.onCinemaSelect = function (item) {
	        this.basicInformationLoader.selectedItem = item;
	    };
	    BasicInformationController.prototype.getSelectedItem = function () {
	        return this.basicInformationLoader.selectedItem;
	    };
	    BasicInformationController.prototype.dateChanged = function () {
	        this.basicInformationLoader.selectedTime = moment(this.cinemaDate);
	    };
	    BasicInformationController.prototype.getSelectedDate = function () {
	        if (this.basicInformationLoader.selectedTime) {
	            return this.basicInformationLoader.selectedTime.format('DD.MM.YYYY');
	        }
	    };
	    BasicInformationController.prototype.onCinemaClicked = function () {
	        this.basicInformationLoader.sendNext({ clicked: 'cinema' });
	    };
	    BasicInformationController.prototype.onDateClicked = function () {
	        this.basicInformationLoader.sendNext({ clicked: 'date' });
	    };
	    return BasicInformationController;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = BasicInformationController;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../tsd.d.ts"/>
	var loader_1 = __webpack_require__(19);
	var loader_2 = __webpack_require__(28);
	var loader_3 = __webpack_require__(35);
	var loader_4 = __webpack_require__(39);
	var triggerDrective_1 = __webpack_require__(46);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    loader_1.default(module);
	    loader_2.default(module);
	    loader_3.default(module);
	    loader_4.default(module);
	    module.directive('ccTrigger', triggerDrective_1.default.Factory());
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../tsd.d.ts"/>
	var basicInfoMenuComponent_1 = __webpack_require__(20);
	var speedDialComponent_1 = __webpack_require__(23);
	var selectDirective_1 = __webpack_require__(26);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    module.component('basicInfoMenu', new basicInfoMenuComponent_1.default);
	    module.component('speedDial', new speedDialComponent_1.default);
	    module.directive('ccSelect', selectDirective_1.default.Factory());
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../../tsd.d.ts"/>
	"use strict";
	var basicMenuController_1 = __webpack_require__(21);
	var BasicMenuComponent = (function () {
	    function BasicMenuComponent() {
	        this.replace = true;
	        this.template = __webpack_require__(22);
	        this.controller = basicMenuController_1.default;
	        this.controllerAs = 'vm';
	        this.bindings = {
	            personObject: '='
	        };
	    }
	    return BasicMenuComponent;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = BasicMenuComponent;


/***/ },
/* 21 */
/***/ function(module, exports) {

	///<reference path="../../tsd.d.ts"/>
	"use strict";
	var BasicMenuController = (function () {
	    function BasicMenuController() {
	    }
	    BasicMenuController.prototype.openMenu = function ($mdOpenMenu, ev) {
	        $mdOpenMenu(ev);
	    };
	    return BasicMenuController;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = BasicMenuController;


/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "<md-menu md-position-mode=\"target-right target\">\r\n  <md-button class=\"md-fab move-down\" aria-label=\"Show basic details\" ng-click=\"vm.openMenu($mdOpenMenu, $event)\">\r\n    <md-icon>account_circle</md-icon>\r\n  </md-button>\r\n  <md-menu-content width=\"6\">\r\n    <md-menu-item>\r\n      <span class=\"cv-bold\"></span>\r\n      <span><img src=\"{{vm.personObject.picture}}\"></span>\r\n    </md-menu-item>\r\n    <md-menu-item>\r\n      <span flex></span>\r\n    </md-menu-item>\r\n    <md-menu-item>\r\n      <span class=\"cv-bold\">Name and Surname</span>\r\n      <span>{{vm.personObject.name}} {{vm.personObject.surName}}</span>\r\n    </md-menu-item>\r\n    <md-menu-divider></md-menu-divider>\r\n    <md-menu-item>\r\n      <span class=\"cv-bold\">Birth date</span>\r\n      <span>{{vm.personObject.dateObject.format('DD.MM.YYYY')}}</span>\r\n    </md-menu-item>\r\n    <md-menu-item>\r\n      <span class=\"cv-bold\">Age</span>\r\n      <span>{{vm.personObject.getAge()}}</span>\r\n    </md-menu-item>\r\n  </md-menu-content>\r\n</md-menu>\r\n"

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../../tsd.d.ts"/>
	"use strict";
	var speedDialController_1 = __webpack_require__(24);
	var SpeedDialComponent = (function () {
	    function SpeedDialComponent() {
	        this.replace = true;
	        this.template = __webpack_require__(25);
	        this.controller = speedDialController_1.default;
	        this.controllerAs = 'vm';
	        this.bindings = {
	            direction: '=',
	            items: '=',
	            onClick: '&'
	        };
	    }
	    return SpeedDialComponent;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = SpeedDialComponent;


/***/ },
/* 24 */
/***/ function(module, exports) {

	///<reference path="../../tsd.d.ts"/>
	"use strict";
	var SpeedDialController = (function () {
	    /* @ngInject */
	    function SpeedDialController($window) {
	        this.$window = $window;
	        this.isOpen = false;
	        this.selectedMode = 'md-scale';
	        this.duration = 2000;
	        this.container = angular.element(document.getElementById('content-container'));
	    }
	    SpeedDialController.$inject = ["$window"];
	    SpeedDialController.prototype.scrollToElement = function (elementId) {
	        var element = angular.element(document.getElementById(elementId));
	        this.container.scrollToElementAnimated(element, 0, 400);
	    };
	    return SpeedDialController;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = SpeedDialController;


/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = "<md-fab-speed-dial md-open=\"vm.isOpen\" md-direction=\"{{vm.direction}}\"\r\n                   ng-class=\"vm.selectedMode\" class=\"cv-move-speed-dial\">\r\n  <md-fab-trigger>\r\n    <md-button class=\"md-icon-button\" aria-label=\"Settings\">\r\n      <ng-md-icon icon=\"{{vm.isOpen ? 'format_align_left' : 'menu'}}\" ng-attr-style=\"fill: {{fill}}\" options='{\"rotation\": \"none\"}'></ng-md-icon>\r\n    </md-button>\r\n  </md-fab-trigger>\r\n  <md-fab-actions>\r\n    <md-button ng-repeat=\"item in vm.items\"\r\n               aria-label=\"{{item.tooltip}}\"\r\n               class=\"md-fab md-raised md-mini\"\r\n               ng-click=\"vm.onClick({item: item})\">\r\n      <md-tooltip md-direction=\"{{item.tooltipDirection}}\"\r\n                  md-autohide=\"false\">{{item.tooltip}}</md-tooltip>\r\n      <md-icon>{{item.icon}}</md-icon>\r\n    </md-button>\r\n  </md-fab-actions>\r\n</md-fab-speed-dial>\r\n"

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../tsd.d.ts"/>
	var SelectController = (function () {
	    function SelectController() {
	    }
	    SelectController.prototype.ctrlGetSelected = function () {
	        this.onChange({
	            item: _.find(this.selectItems, { text: this.selectedCinema })
	        });
	    };
	    return SelectController;
	}());
	var SelectComponent = (function () {
	    function SelectComponent() {
	        this.replace = true;
	        this.template = __webpack_require__(27);
	        this.controller = SelectController;
	        this.controllerAs = 'ctrl';
	        this.bindToController = {
	            selectItems: '<',
	            label: '<',
	            onChange: '&'
	        };
	    }
	    SelectComponent.Factory = function () {
	        var directive = function () { return new SelectComponent(); };
	        directive.$inject = [];
	        return directive;
	    };
	    return SelectComponent;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = SelectComponent;


/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = "<md-input-container>\r\n  <label>{{ctrl.label}}</label>\r\n  <md-select ng-model=\"ctrl.selectedCinema\" ng-change=\"ctrl.ctrlGetSelected()\">\r\n    <md-option ng-repeat=\"item in ctrl.selectItems\" value=\"{{item.text}}\">\r\n      {{item.text}}\r\n    </md-option>\r\n  </md-select>\r\n</md-input-container>\r\n"

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../../tsd.d.ts"/>
	"use strict";
	var timelineComponent_1 = __webpack_require__(29);
	var timelineEntryComponent_1 = __webpack_require__(32);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    module.component('timeline', new timelineComponent_1.default);
	    module.component('timelineEntry', new timelineEntryComponent_1.default);
	};


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../../tsd.d.ts"/>
	"use strict";
	var timelineController_1 = __webpack_require__(30);
	var TimelineComponent = (function () {
	    function TimelineComponent() {
	        this.replace = true;
	        this.template = __webpack_require__(31);
	        this.controller = timelineController_1.default;
	        this.controllerAs = 'vm';
	        this.bindings = {};
	    }
	    return TimelineComponent;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = TimelineComponent;


/***/ },
/* 30 */
/***/ function(module, exports) {

	///<reference path="../../tsd.d.ts"/>
	"use strict";
	var TimelineController = (function () {
	    function TimelineController(timelineLoader, basicInformationLoader, $window) {
	        var _this = this;
	        this.timelineLoader = timelineLoader;
	        this.basicInformationLoader = basicInformationLoader;
	        this.$window = $window;
	        this.container = angular.element(document.getElementById('content-container'));
	        var person = this.basicInformationLoader.getPersonObject();
	        if (person.hasOwnProperty('$$state')) {
	            person.then(function (personData) {
	                _this.personData = personData;
	            });
	        }
	        var timeline = this.timelineLoader.getTimelineData();
	        if (timeline.hasOwnProperty('$$state')) {
	            timeline.then(function (timelineData) {
	                _this.entries = timelineData;
	                setTimeout(function () {
	                    _this.showVisible();
	                });
	            });
	        }
	        else {
	            setTimeout(function () {
	                _this.showVisible();
	            });
	        }
	        this.container.on('scroll', function () {
	            _this.showVisible();
	        });
	    }
	    Object.defineProperty(TimelineController, "offset", {
	        get: function () { return 100; },
	        enumerable: true,
	        configurable: true
	    });
	    ;
	    TimelineController.prototype.showVisible = function () {
	        var _this = this;
	        var timelineEntries = document.getElementsByClassName('timeline-entry');
	        angular.forEach(timelineEntries, function (oneEntry, key) {
	            if ((Math.abs(oneEntry.getBoundingClientRect().top + TimelineController.offset)) < _this.$window.innerHeight) {
	                if (_this.entries[key]) {
	                    _this.entries[key].isVisible = true;
	                    if (key + 1 === _this.entries.length) {
	                        _this.container.off('scroll');
	                    }
	                }
	            }
	        });
	    };
	    TimelineController.prototype.getClass = function () {
	        return {
	            'all-right': this.$window.innerWidth < 960
	        };
	    };
	    return TimelineController;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = TimelineController;


/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = "<div class=\"container\" id=\"cv-timeline-container\">\r\n  <div class=\"row\">\r\n    <div class=\"timeline-centered\" ng-class=\"vm.getClass()\">\r\n      <timeline-entry ng-repeat=\"entry in vm.entries\"\r\n                      entry=\"entry\"\r\n                      person-object=\"vm.personData\"\r\n                      is-left=\"$odd\"></timeline-entry>\r\n      <article class=\"timeline-entry begin\">\r\n\r\n        <div class=\"timeline-end\">\r\n\r\n          <div class=\"arrow-down\"></div>\r\n\r\n        </div>\r\n\r\n      </article>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../../tsd.d.ts"/>
	"use strict";
	var timelineEntryController_1 = __webpack_require__(33);
	var TimelineEntryComponent = (function () {
	    function TimelineEntryComponent() {
	        this.replace = true;
	        this.template = __webpack_require__(34);
	        this.controller = timelineEntryController_1.default;
	        this.controllerAs = 'vm';
	        this.bindings = {
	            isLeft: '=',
	            personObject: '=',
	            entry: '='
	        };
	    }
	    return TimelineEntryComponent;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = TimelineEntryComponent;


/***/ },
/* 33 */
/***/ function(module, exports) {

	///<reference path="../../tsd.d.ts"/>
	"use strict";
	var TimelineEntryController = (function () {
	    /* @ngInject */
	    function TimelineEntryController($window) {
	        this.$window = $window;
	    }
	    TimelineEntryController.$inject = ["$window"];
	    TimelineEntryController.prototype.getCurrentClasses = function () {
	        return {
	            'left-aligned': this.isLeft && this.$window.innerWidth > 960
	        };
	    };
	    TimelineEntryController.prototype.bounce = function () {
	        return {
	            'is-hidden': !this.entry.isVisible,
	            'bounce-in': this.entry.isVisible
	        };
	    };
	    return TimelineEntryController;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = TimelineEntryController;


/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = "<article class=\"timeline-entry\" ng-class=\"vm.getCurrentClasses()\">\r\n\r\n  <div class=\"timeline-entry-inner\">\r\n    <time class=\"timeline-time\" datetime=\"{{vm.entry.timeObject.format('YYYY-MM-DD')}}\"><span>{{vm.entry.timeObject.format('DD.MM.YYYY')}}</span>\r\n      <span class=\"cv-time\">{{vm.entry.getTime()}}</span></time>\r\n    <div class=\"timeline-icon {{vm.entry['color-class']}}\" ng-click=\"vm.entry.isVisible = !vm.entry.isVisible\">\r\n      <md-button class=\"md-icon-button\" aria-label=\"Settings\">\r\n        <md-icon>{{vm.entry.icon}}</md-icon>\r\n      </md-button>\r\n    </div>\r\n\r\n    <div class=\"timeline-label\" ng-class=\"vm.bounce()\">\r\n      <h2>{{vm.personObject.name}} {{vm.personObject.surName}} <span> {{vm.entry.title}}</span></h2>\r\n      <p>{{vm.entry.text}}</p>\r\n    </div>\r\n  </div>\r\n\r\n</article>\r\n"

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../tsd.d.ts"/>
	var contactsComponent_1 = __webpack_require__(36);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    module.component('contacts', new contactsComponent_1.default);
	};


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../../tsd.d.ts"/>
	"use strict";
	var contactsController_1 = __webpack_require__(37);
	var ContactsComponent = (function () {
	    function ContactsComponent() {
	        this.replace = true;
	        this.template = __webpack_require__(38);
	        this.controller = contactsController_1.default;
	        this.controllerAs = 'vm';
	        this.bindings = {};
	    }
	    return ContactsComponent;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ContactsComponent;


/***/ },
/* 37 */
/***/ function(module, exports) {

	///<reference path="../../tsd.d.ts"/>
	"use strict";
	var ContactsController = (function () {
	    /* @ngInject */
	    function ContactsController(contactLoader, $window) {
	        var _this = this;
	        this.contactLoader = contactLoader;
	        this.$window = $window;
	        var contacts = this.contactLoader.getContactData();
	        if (contacts.hasOwnProperty('$$state')) {
	            contacts.then(function (contactsData) {
	                _this.contactsData = contactsData;
	            });
	        }
	    }
	    ContactsController.$inject = ["contactLoader", "$window"];
	    ContactsController.prototype.contactClicked = function (contact) {
	        if (contact.hasOwnProperty('link')) {
	            this.$window.location.href = contact.link;
	        }
	    };
	    return ContactsController;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ContactsController;


/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = "<md-icon ng-repeat=\"contact in vm.contactsData\"\r\n         md-svg-src=\"{{contact.iconSrc}}\"\r\n         aria-label=\"{{contact.title}}\"\r\n         ng-click=\"vm.contactClicked(contact)\"\r\n         class=\"cv-contact {{contact.class}}\"\r\n></md-icon>\r\n"

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../tsd.d.ts"/>
	var basicGraphDirective_1 = __webpack_require__(40);
	var graphTileComponent_1 = __webpack_require__(42);
	var workTileController_1 = __webpack_require__(44);
	var schoolTileController_1 = __webpack_require__(45);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    module.directive('basicGraph', basicGraphDirective_1.default.Factory());
	    module.component('workTile', new graphTileComponent_1.default(workTileController_1.default));
	    module.component('schoolTile', new graphTileComponent_1.default(schoolTileController_1.default));
	};


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../../tsd.d.ts"/>
	"use strict";
	var basicGraphController_1 = __webpack_require__(41);
	var BasicGraphDirective = (function () {
	    function BasicGraphDirective() {
	        this.replace = true;
	        this.template = "<div></div>";
	        this.controller = basicGraphController_1.default;
	        this.controllerAs = 'vm';
	        this.scope = {};
	        this.bindToController = {
	            type: '=',
	            data: '=',
	            colors: '=',
	            names: '='
	        };
	        this.link = function (scope, element, attrs, controller) {
	            scope.$watch(function () {
	                return controller.data;
	            }, function (newData) {
	                if (controller.data) {
	                    setTimeout(function () {
	                        scope.chart = c3.generate({
	                            bindto: element[0],
	                            data: {
	                                names: controller.names,
	                                colors: controller.colors,
	                                type: controller.type,
	                                columns: controller.data
	                            }
	                        });
	                    });
	                }
	            });
	            scope.$watch(function () {
	                return controller.type;
	            }, function (newData) {
	                if (scope.chart) {
	                    scope.chart.transform(controller.type);
	                }
	            });
	            //console.log(element);
	        };
	    }
	    BasicGraphDirective.Factory = function () {
	        var directive = function () { return new BasicGraphDirective(); };
	        directive.$inject = [];
	        return directive;
	    };
	    return BasicGraphDirective;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = BasicGraphDirective;


/***/ },
/* 41 */
/***/ function(module, exports) {

	///<reference path="../../tsd.d.ts"/>
	"use strict";
	var BasicGraphController = (function () {
	    function BasicGraphController() {
	    }
	    return BasicGraphController;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = BasicGraphController;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../../tsd.d.ts"/>
	"use strict";
	var GraphTileComponent = (function () {
	    function GraphTileComponent(controller) {
	        this.controller = controller;
	        this.replace = true;
	        this.template = __webpack_require__(43);
	        this.controllerAs = 'vm';
	        this.bindings = {};
	    }
	    return GraphTileComponent;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = GraphTileComponent;


/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = "<md-card>\r\n  <md-card-title>\r\n    <md-card-title-text>\r\n      <span class=\"md-headline\">{{vm.tileTitle}}</span>\r\n    </md-card-title-text>\r\n  </md-card-title>\r\n  <md-card-content layout=\"row\" layout-align=\"space-between\">\r\n    <div class=\"card-media cv-graph\">\r\n      <basic-graph type=\"vm.tileData.graphData.type\"\r\n                   data=\"vm.tileData.graphData.data\"\r\n                   colors=\"vm.tileData.graphData.colors\"\r\n                   names=\"vm.tileData.graphData.names\" id=\"{{vm.graphId}}\">\r\n      </basic-graph>\r\n    </div>\r\n    <md-card-actions layout=\"column\">\r\n      <md-button class=\"md-icon-button\" aria-label=\"Settings\">\r\n        <md-icon>mode_comment</md-icon>\r\n      </md-button>\r\n      <speed-dial items=\"vm.speedDialItems\" direction=\"'down'\" on-click=\"vm.onSpeedDialClick(item)\"></speed-dial>\r\n    </md-card-actions>\r\n  </md-card-content>\r\n</md-card>\r\n"

/***/ },
/* 44 */
/***/ function(module, exports) {

	///<reference path="../../tsd.d.ts"/>
	"use strict";
	var WorkTileController = (function () {
	    /* @ngInject */
	    function WorkTileController(jobsLoader) {
	        var _this = this;
	        this.jobsLoader = jobsLoader;
	        this.graphId = 'work-tile';
	        this.tileTitle = 'Jobs per month';
	        this.availableGraphs = [
	            { icon: 'donut_large', type: 'donut', title: 'Donut chart' },
	            { icon: 'pie_chart', type: 'pie', title: 'Pie chart' },
	            { icon: 'equalizer', type: 'bar', title: 'Bar chart' }
	        ];
	        this.speedDialItems = [];
	        this.initSpeedDial();
	        var jobsData = this.jobsLoader.getJobsData();
	        if (jobsData.hasOwnProperty('$$state')) {
	            jobsData.then(function (workData) {
	                _this.tileData = workData;
	                _this.tileData.graphData.type = _this.availableGraphs[0].type;
	            });
	        }
	    }
	    WorkTileController.$inject = ["jobsLoader"];
	    WorkTileController.prototype.initSpeedDial = function () {
	        var _this = this;
	        angular.forEach(this.availableGraphs, function (oneGraph) {
	            _this.speedDialItems.push({
	                tooltip: oneGraph.title,
	                tooltipDirection: 'top',
	                icon: oneGraph.icon,
	                type: oneGraph.type
	            });
	        });
	    };
	    WorkTileController.prototype.onSpeedDialClick = function (item) {
	        this.tileData.graphData.type = item.type;
	    };
	    return WorkTileController;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = WorkTileController;


/***/ },
/* 45 */
/***/ function(module, exports) {

	///<reference path="../../tsd.d.ts"/>
	"use strict";
	var SchoolTileController = (function () {
	    /* @ngInject */
	    function SchoolTileController(schoolLoader) {
	        var _this = this;
	        this.schoolLoader = schoolLoader;
	        this.graphId = 'work-tile';
	        this.tileTitle = 'Schools per month';
	        this.availableGraphs = [
	            { icon: 'donut_large', type: 'donut', title: 'Donut chart' },
	            { icon: 'pie_chart', type: 'pie', title: 'Pie chart' },
	            { icon: 'equalizer', type: 'bar', title: 'Bar chart' }
	        ];
	        this.speedDialItems = [];
	        this.initSpeedDial();
	        var jobsData = this.schoolLoader.getJobsData();
	        if (jobsData.hasOwnProperty('$$state')) {
	            jobsData.then(function (schoolData) {
	                _this.tileData = schoolData;
	                _this.tileData.graphData.type = _this.availableGraphs[0].type;
	            });
	        }
	    }
	    SchoolTileController.$inject = ["schoolLoader"];
	    SchoolTileController.prototype.initSpeedDial = function () {
	        var _this = this;
	        angular.forEach(this.availableGraphs, function (oneGraph) {
	            _this.speedDialItems.push({
	                tooltip: oneGraph.title,
	                tooltipDirection: 'top',
	                icon: oneGraph.icon,
	                type: oneGraph.type
	            });
	        });
	    };
	    SchoolTileController.prototype.onSpeedDialClick = function (item) {
	        this.tileData.graphData.type = item.type;
	    };
	    return SchoolTileController;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = SchoolTileController;


/***/ },
/* 46 */
/***/ function(module, exports) {

	"use strict";
	///<reference path="../tsd.d.ts"/>
	var TriggerLink = (function () {
	    function TriggerLink(scope, element) {
	        console.log(scope, element);
	        scope.$watch('activate', function (isActive) {
	            if (isActive) {
	                scope.trigger();
	            }
	        });
	        scope.trigger = function () {
	            if (element && element.find(scope.elementName)) {
	                setTimeout(function () {
	                    element.find(scope.elementName).triggerHandler(scope.eventName);
	                });
	            }
	        };
	    }
	    return TriggerLink;
	}());
	var TriggerDirective = (function () {
	    function TriggerDirective() {
	        this.replace = false;
	        this.link = TriggerLink;
	        this.scope = {
	            activate: '<',
	            eventName: '@',
	            elementName: '@'
	        };
	    }
	    TriggerDirective.Factory = function () {
	        var directive = function () { return new TriggerDirective(); };
	        directive.$inject = [];
	        return directive;
	    };
	    return TriggerDirective;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = TriggerDirective;


/***/ },
/* 47 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=cinema_browser.js.map