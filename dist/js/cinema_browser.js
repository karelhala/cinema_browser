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
	module.exports = __webpack_require__(151);


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
	var loader_3 = __webpack_require__(122);
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

	module.exports = "<div ng-controller=\"basicInformationController as basic\">\n  <div class=\"md-toolbar-tools\" layout=\"row\" layout-align=\"center center\" >\n    <cc-trigger activate=\"basic.activateDatePicker\"\n                event-name=\"click\"\n                element-name=\"button\">\n      <md-datepicker\n        ng-model=\"basic.cinemaDate\"\n        md-placeholder=\"Enter date\"\n        class=\"cc-toolbar-item cc-datepicker\"\n        md-min-date=\"basic.minDate\"\n        ng-change=\"basic.dateChanged()\">\n      </md-datepicker>\n    </cc-trigger>\n\n    <cc-select\n      select-items=\"basic.items\"\n      label=\"basic.label\"\n      on-change=\"basic.onCinemaSelect(item)\"\n      class=\"cc-toolbar-item\"\n      cc-trigger\n      activate=\"basic.activateSelect\"\n      event-name=\"click\"\n      element-name=\"md-select\"\n    ></cc-select>\n  </div>\n</div>\n"

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "<div>\n  <div class=\"md-whiteframe-3dp cv-content cc-selected\"\n       id=\"selected-data\"\n       layout=\"row\"\n       layout-align=\"center center\"\n       ng-controller=\"basicInformationController as basic\">\n    <h1>Zobrazuji filmy v kině\n      <a ng-click=\"basic.onCinemaClicked()\">{{basic.getSelectedItem()? basic.getSelectedItem().text : 'vše'}}</a>,\n      pro datum <a ng-click=\"basic.onDateClicked()\">{{basic.getSelectedDate() ? basic.getSelectedDate() : 'vše'}}</a></h1>\n  </div>\n  <div class=\"md-whiteframe-3dp cv-content cv-timeline-trend\" id=\"timeline-trend\" layout=\"column\">\n    asdf\n  </div>\n</div>\n"

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
	        console.log(this.basicInformationLoader.informationSubject);
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
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../tsd.d.ts"/>
	var loader_1 = __webpack_require__(123);
	var loader_2 = __webpack_require__(132);
	var loader_3 = __webpack_require__(139);
	var loader_4 = __webpack_require__(143);
	var triggerDrective_1 = __webpack_require__(150);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    loader_1.default(module);
	    loader_2.default(module);
	    loader_3.default(module);
	    loader_4.default(module);
	    module.directive('ccTrigger', triggerDrective_1.default.Factory());
	};


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../tsd.d.ts"/>
	var basicInfoMenuComponent_1 = __webpack_require__(124);
	var speedDialComponent_1 = __webpack_require__(127);
	var selectDirective_1 = __webpack_require__(130);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    module.component('basicInfoMenu', new basicInfoMenuComponent_1.default);
	    module.component('speedDial', new speedDialComponent_1.default);
	    module.directive('ccSelect', selectDirective_1.default.Factory());
	};


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../../tsd.d.ts"/>
	"use strict";
	var basicMenuController_1 = __webpack_require__(125);
	var BasicMenuComponent = (function () {
	    function BasicMenuComponent() {
	        this.replace = true;
	        this.template = __webpack_require__(126);
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
/* 125 */
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
/* 126 */
/***/ function(module, exports) {

	module.exports = "<md-menu md-position-mode=\"target-right target\">\n  <md-button class=\"md-fab move-down\" aria-label=\"Show basic details\" ng-click=\"vm.openMenu($mdOpenMenu, $event)\">\n    <md-icon>account_circle</md-icon>\n  </md-button>\n  <md-menu-content width=\"6\">\n    <md-menu-item>\n      <span class=\"cv-bold\"></span>\n      <span><img src=\"{{vm.personObject.picture}}\"></span>\n    </md-menu-item>\n    <md-menu-item>\n      <span flex></span>\n    </md-menu-item>\n    <md-menu-item>\n      <span class=\"cv-bold\">Name and Surname</span>\n      <span>{{vm.personObject.name}} {{vm.personObject.surName}}</span>\n    </md-menu-item>\n    <md-menu-divider></md-menu-divider>\n    <md-menu-item>\n      <span class=\"cv-bold\">Birth date</span>\n      <span>{{vm.personObject.dateObject.format('DD.MM.YYYY')}}</span>\n    </md-menu-item>\n    <md-menu-item>\n      <span class=\"cv-bold\">Age</span>\n      <span>{{vm.personObject.getAge()}}</span>\n    </md-menu-item>\n  </md-menu-content>\n</md-menu>\n"

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../../tsd.d.ts"/>
	"use strict";
	var speedDialController_1 = __webpack_require__(128);
	var SpeedDialComponent = (function () {
	    function SpeedDialComponent() {
	        this.replace = true;
	        this.template = __webpack_require__(129);
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
/* 128 */
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
/* 129 */
/***/ function(module, exports) {

	module.exports = "<md-fab-speed-dial md-open=\"vm.isOpen\" md-direction=\"{{vm.direction}}\"\n                   ng-class=\"vm.selectedMode\" class=\"cv-move-speed-dial\">\n  <md-fab-trigger>\n    <md-button class=\"md-icon-button\" aria-label=\"Settings\">\n      <ng-md-icon icon=\"{{vm.isOpen ? 'format_align_left' : 'menu'}}\" ng-attr-style=\"fill: {{fill}}\" options='{\"rotation\": \"none\"}'></ng-md-icon>\n    </md-button>\n  </md-fab-trigger>\n  <md-fab-actions>\n    <md-button ng-repeat=\"item in vm.items\"\n               aria-label=\"{{item.tooltip}}\"\n               class=\"md-fab md-raised md-mini\"\n               ng-click=\"vm.onClick({item: item})\">\n      <md-tooltip md-direction=\"{{item.tooltipDirection}}\"\n                  md-autohide=\"false\">{{item.tooltip}}</md-tooltip>\n      <md-icon>{{item.icon}}</md-icon>\n    </md-button>\n  </md-fab-actions>\n</md-fab-speed-dial>\n"

/***/ },
/* 130 */
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
	        this.template = __webpack_require__(131);
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
/* 131 */
/***/ function(module, exports) {

	module.exports = "<md-input-container>\n  <label>{{ctrl.label}}</label>\n  <md-select ng-model=\"ctrl.selectedCinema\" ng-change=\"ctrl.ctrlGetSelected()\">\n    <md-option ng-repeat=\"item in ctrl.selectItems\" value=\"{{item.text}}\">\n      {{item.text}}\n    </md-option>\n  </md-select>\n</md-input-container>\n"

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../../tsd.d.ts"/>
	"use strict";
	var timelineComponent_1 = __webpack_require__(133);
	var timelineEntryComponent_1 = __webpack_require__(136);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    module.component('timeline', new timelineComponent_1.default);
	    module.component('timelineEntry', new timelineEntryComponent_1.default);
	};


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../../tsd.d.ts"/>
	"use strict";
	var timelineController_1 = __webpack_require__(134);
	var TimelineComponent = (function () {
	    function TimelineComponent() {
	        this.replace = true;
	        this.template = __webpack_require__(135);
	        this.controller = timelineController_1.default;
	        this.controllerAs = 'vm';
	        this.bindings = {};
	    }
	    return TimelineComponent;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = TimelineComponent;


/***/ },
/* 134 */
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
/* 135 */
/***/ function(module, exports) {

	module.exports = "<div class=\"container\" id=\"cv-timeline-container\">\n  <div class=\"row\">\n    <div class=\"timeline-centered\" ng-class=\"vm.getClass()\">\n      <timeline-entry ng-repeat=\"entry in vm.entries\"\n                      entry=\"entry\"\n                      person-object=\"vm.personData\"\n                      is-left=\"$odd\"></timeline-entry>\n      <article class=\"timeline-entry begin\">\n\n        <div class=\"timeline-end\">\n\n          <div class=\"arrow-down\"></div>\n\n        </div>\n\n      </article>\n    </div>\n  </div>\n</div>\n"

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../../tsd.d.ts"/>
	"use strict";
	var timelineEntryController_1 = __webpack_require__(137);
	var TimelineEntryComponent = (function () {
	    function TimelineEntryComponent() {
	        this.replace = true;
	        this.template = __webpack_require__(138);
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
/* 137 */
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
/* 138 */
/***/ function(module, exports) {

	module.exports = "<article class=\"timeline-entry\" ng-class=\"vm.getCurrentClasses()\">\n\n  <div class=\"timeline-entry-inner\">\n    <time class=\"timeline-time\" datetime=\"{{vm.entry.timeObject.format('YYYY-MM-DD')}}\"><span>{{vm.entry.timeObject.format('DD.MM.YYYY')}}</span>\n      <span class=\"cv-time\">{{vm.entry.getTime()}}</span></time>\n    <div class=\"timeline-icon {{vm.entry['color-class']}}\" ng-click=\"vm.entry.isVisible = !vm.entry.isVisible\">\n      <md-button class=\"md-icon-button\" aria-label=\"Settings\">\n        <md-icon>{{vm.entry.icon}}</md-icon>\n      </md-button>\n    </div>\n\n    <div class=\"timeline-label\" ng-class=\"vm.bounce()\">\n      <h2>{{vm.personObject.name}} {{vm.personObject.surName}} <span> {{vm.entry.title}}</span></h2>\n      <p>{{vm.entry.text}}</p>\n    </div>\n  </div>\n\n</article>\n"

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../tsd.d.ts"/>
	var contactsComponent_1 = __webpack_require__(140);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    module.component('contacts', new contactsComponent_1.default);
	};


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../../tsd.d.ts"/>
	"use strict";
	var contactsController_1 = __webpack_require__(141);
	var ContactsComponent = (function () {
	    function ContactsComponent() {
	        this.replace = true;
	        this.template = __webpack_require__(142);
	        this.controller = contactsController_1.default;
	        this.controllerAs = 'vm';
	        this.bindings = {};
	    }
	    return ContactsComponent;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ContactsComponent;


/***/ },
/* 141 */
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
/* 142 */
/***/ function(module, exports) {

	module.exports = "<md-icon ng-repeat=\"contact in vm.contactsData\"\n         md-svg-src=\"{{contact.iconSrc}}\"\n         aria-label=\"{{contact.title}}\"\n         ng-click=\"vm.contactClicked(contact)\"\n         class=\"cv-contact {{contact.class}}\"\n></md-icon>\n"

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../tsd.d.ts"/>
	var basicGraphDirective_1 = __webpack_require__(144);
	var graphTileComponent_1 = __webpack_require__(146);
	var workTileController_1 = __webpack_require__(148);
	var schoolTileController_1 = __webpack_require__(149);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    module.directive('basicGraph', basicGraphDirective_1.default.Factory());
	    module.component('workTile', new graphTileComponent_1.default(workTileController_1.default));
	    module.component('schoolTile', new graphTileComponent_1.default(schoolTileController_1.default));
	};


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../../tsd.d.ts"/>
	"use strict";
	var basicGraphController_1 = __webpack_require__(145);
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
/* 145 */
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
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../../tsd.d.ts"/>
	"use strict";
	var GraphTileComponent = (function () {
	    function GraphTileComponent(controller) {
	        this.controller = controller;
	        this.replace = true;
	        this.template = __webpack_require__(147);
	        this.controllerAs = 'vm';
	        this.bindings = {};
	    }
	    return GraphTileComponent;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = GraphTileComponent;


/***/ },
/* 147 */
/***/ function(module, exports) {

	module.exports = "<md-card>\n  <md-card-title>\n    <md-card-title-text>\n      <span class=\"md-headline\">{{vm.tileTitle}}</span>\n    </md-card-title-text>\n  </md-card-title>\n  <md-card-content layout=\"row\" layout-align=\"space-between\">\n    <div class=\"card-media cv-graph\">\n      <basic-graph type=\"vm.tileData.graphData.type\"\n                   data=\"vm.tileData.graphData.data\"\n                   colors=\"vm.tileData.graphData.colors\"\n                   names=\"vm.tileData.graphData.names\" id=\"{{vm.graphId}}\">\n      </basic-graph>\n    </div>\n    <md-card-actions layout=\"column\">\n      <md-button class=\"md-icon-button\" aria-label=\"Settings\">\n        <md-icon>mode_comment</md-icon>\n      </md-button>\n      <speed-dial items=\"vm.speedDialItems\" direction=\"'down'\" on-click=\"vm.onSpeedDialClick(item)\"></speed-dial>\n    </md-card-actions>\n  </md-card-content>\n</md-card>\n"

/***/ },
/* 148 */
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
/* 149 */
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
/* 150 */
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
/* 151 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=cinema_browser.js.map