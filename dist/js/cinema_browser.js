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
	__webpack_require__(49);
	var app = angular.module('karelHalaCV', ['ngMaterial', 'ngMdIcons', 'ui.router', 'ngAnimate', 'duScroll', 'ngWebworker']);
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
	var movieLoader_1 = __webpack_require__(50);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    module.service('basicInformationLoader', basicInformationLoader_1.default);
	    module.service('timelineLoader', timelineLoader_1.default);
	    module.service('contactLoader', contactLoader_1.default);
	    module.service('jobsLoader', jobsLoader_1.default);
	    module.service('schoolLoader', schoolLoader_1.default);
	    module.service('movieLoader', movieLoader_1.default);
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
	var WorkerGreeter = (function () {
	    function WorkerGreeter(Webworker) {
	        this.Webworker = Webworker;
	        var myWorker = Webworker.create(this.greedFromWorker);
	    }
	    WorkerGreeter.prototype.greedFromWorker = function (data) {
	    };
	    return WorkerGreeter;
	}());
	exports.WorkerGreeter = WorkerGreeter;
	var BasicInformationController = (function () {
	    /* @ngInject */
	    function BasicInformationController(basicInformationLoader, movieLoader) {
	        var _this = this;
	        this.basicInformationLoader = basicInformationLoader;
	        this.movieLoader = movieLoader;
	        this.direction = 'down';
	        this.activateSelect = false;
	        this.activateDatePicker = false;
	        console.log(this);
	        this.movieLoader.getMovies().then(function (data) {
	            console.log(data);
	        });
	        this.minDate = new Date();
	        this.label = 'Kino';
	        basicInformationLoader.getCinemas().then(function (items) { return _this.items = items; });
	        this.subscribeToInformationLoader();
	    }
	    BasicInformationController.$inject = ["basicInformationLoader", "movieLoader"];
	    BasicInformationController.prototype.subscribeToInformationLoader = function () {
	        var _this = this;
	        this.basicInformationLoader
	            .informationSubject
	            .subscribe(function (data) { return _this.onNextData(data); }, this.onFailAndClose, this.onFailAndClose);
	    };
	    BasicInformationController.prototype.onNextData = function (data) {
	        var _this = this;
	        if (data.hasOwnProperty('clicked')) {
	            this.activateSelect = data.clicked === 'cinema';
	            this.activateDatePicker = data.clicked === 'date';
	            setTimeout(function () {
	                _this.activateSelect = false;
	                _this.activateDatePicker = false;
	            });
	        }
	    };
	    BasicInformationController.prototype.onFailAndClose = function () {
	        console.log('Fail or close subject');
	    };
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

	module.exports = "<md-menu md-position-mode=\"target-right target\">\n  <md-button class=\"md-fab move-down\" aria-label=\"Show basic details\" ng-click=\"vm.openMenu($mdOpenMenu, $event)\">\n    <md-icon>account_circle</md-icon>\n  </md-button>\n  <md-menu-content width=\"6\">\n    <md-menu-item>\n      <span class=\"cv-bold\"></span>\n      <span><img src=\"{{vm.personObject.picture}}\"></span>\n    </md-menu-item>\n    <md-menu-item>\n      <span flex></span>\n    </md-menu-item>\n    <md-menu-item>\n      <span class=\"cv-bold\">Name and Surname</span>\n      <span>{{vm.personObject.name}} {{vm.personObject.surName}}</span>\n    </md-menu-item>\n    <md-menu-divider></md-menu-divider>\n    <md-menu-item>\n      <span class=\"cv-bold\">Birth date</span>\n      <span>{{vm.personObject.dateObject.format('DD.MM.YYYY')}}</span>\n    </md-menu-item>\n    <md-menu-item>\n      <span class=\"cv-bold\">Age</span>\n      <span>{{vm.personObject.getAge()}}</span>\n    </md-menu-item>\n  </md-menu-content>\n</md-menu>\n"

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

	module.exports = "<md-fab-speed-dial md-open=\"vm.isOpen\" md-direction=\"{{vm.direction}}\"\n                   ng-class=\"vm.selectedMode\" class=\"cv-move-speed-dial\">\n  <md-fab-trigger>\n    <md-button class=\"md-icon-button\" aria-label=\"Settings\">\n      <ng-md-icon icon=\"{{vm.isOpen ? 'format_align_left' : 'menu'}}\" ng-attr-style=\"fill: {{fill}}\" options='{\"rotation\": \"none\"}'></ng-md-icon>\n    </md-button>\n  </md-fab-trigger>\n  <md-fab-actions>\n    <md-button ng-repeat=\"item in vm.items\"\n               aria-label=\"{{item.tooltip}}\"\n               class=\"md-fab md-raised md-mini\"\n               ng-click=\"vm.onClick({item: item})\">\n      <md-tooltip md-direction=\"{{item.tooltipDirection}}\"\n                  md-autohide=\"false\">{{item.tooltip}}</md-tooltip>\n      <md-icon>{{item.icon}}</md-icon>\n    </md-button>\n  </md-fab-actions>\n</md-fab-speed-dial>\n"

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

	module.exports = "<md-input-container>\n  <label>{{ctrl.label}}</label>\n  <md-select ng-model=\"ctrl.selectedCinema\" ng-change=\"ctrl.ctrlGetSelected()\">\n    <md-option ng-repeat=\"item in ctrl.selectItems\" value=\"{{item.text}}\">\n      {{item.text}}\n    </md-option>\n  </md-select>\n</md-input-container>\n"

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

	module.exports = "<div class=\"container\" id=\"cv-timeline-container\">\n  <div class=\"row\">\n    <div class=\"timeline-centered\" ng-class=\"vm.getClass()\">\n      <timeline-entry ng-repeat=\"entry in vm.entries\"\n                      entry=\"entry\"\n                      person-object=\"vm.personData\"\n                      is-left=\"$odd\"></timeline-entry>\n      <article class=\"timeline-entry begin\">\n\n        <div class=\"timeline-end\">\n\n          <div class=\"arrow-down\"></div>\n\n        </div>\n\n      </article>\n    </div>\n  </div>\n</div>\n"

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

	module.exports = "<article class=\"timeline-entry\" ng-class=\"vm.getCurrentClasses()\">\n\n  <div class=\"timeline-entry-inner\">\n    <time class=\"timeline-time\" datetime=\"{{vm.entry.timeObject.format('YYYY-MM-DD')}}\"><span>{{vm.entry.timeObject.format('DD.MM.YYYY')}}</span>\n      <span class=\"cv-time\">{{vm.entry.getTime()}}</span></time>\n    <div class=\"timeline-icon {{vm.entry['color-class']}}\" ng-click=\"vm.entry.isVisible = !vm.entry.isVisible\">\n      <md-button class=\"md-icon-button\" aria-label=\"Settings\">\n        <md-icon>{{vm.entry.icon}}</md-icon>\n      </md-button>\n    </div>\n\n    <div class=\"timeline-label\" ng-class=\"vm.bounce()\">\n      <h2>{{vm.personObject.name}} {{vm.personObject.surName}} <span> {{vm.entry.title}}</span></h2>\n      <p>{{vm.entry.text}}</p>\n    </div>\n  </div>\n\n</article>\n"

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

	module.exports = "<md-icon ng-repeat=\"contact in vm.contactsData\"\n         md-svg-src=\"{{contact.iconSrc}}\"\n         aria-label=\"{{contact.title}}\"\n         ng-click=\"vm.contactClicked(contact)\"\n         class=\"cv-contact {{contact.class}}\"\n></md-icon>\n"

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

	module.exports = "<md-card>\n  <md-card-title>\n    <md-card-title-text>\n      <span class=\"md-headline\">{{vm.tileTitle}}</span>\n    </md-card-title-text>\n  </md-card-title>\n  <md-card-content layout=\"row\" layout-align=\"space-between\">\n    <div class=\"card-media cv-graph\">\n      <basic-graph type=\"vm.tileData.graphData.type\"\n                   data=\"vm.tileData.graphData.data\"\n                   colors=\"vm.tileData.graphData.colors\"\n                   names=\"vm.tileData.graphData.names\" id=\"{{vm.graphId}}\">\n      </basic-graph>\n    </div>\n    <md-card-actions layout=\"column\">\n      <md-button class=\"md-icon-button\" aria-label=\"Settings\">\n        <md-icon>mode_comment</md-icon>\n      </md-button>\n      <speed-dial items=\"vm.speedDialItems\" direction=\"'down'\" on-click=\"vm.onSpeedDialClick(item)\"></speed-dial>\n    </md-card-actions>\n  </md-card-content>\n</md-card>\n"

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

/***/ },
/* 48 */,
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * ng-webworker - ng-webworker creates dynamic webworkers so angular apps can be multi-threaded.
	 * @link https://github.com/mattslocum/ng-webworker
	 * @license MIT
	 */
	!function (name, context, definition) {
	    // CommonJS
	    if (typeof module != 'undefined' && module.exports) module.exports = definition();
	    // AMD
	    else if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    // <script>
	    else context[name] = definition()
	}('ngWebworker', this, function () {
	    'use strict';

	    var oWebworkerModule = angular.module('ngWebworker', []),
	        CONST_FUNCTION = "function",
	        CONST_RETURN = "return",
	        CONST_COMPLETE = "complete",
	        CONST_NOTICE = "notice";


	    oWebworkerModule.provider('Webworker', function() {
	        var WebworkerConfig = {
	            async: false,
	            helperPath: "worker_wrapper.js",
	            useHelper: false, // gets set back to true for IE
	            transferOwnership: true // if you pass in a ByteArray. Warning: Experimental
	        };

	        this.setConfig = function(oConfig) {
	            angular.extend(WebworkerConfig, oConfig);
	        };
	        this.setHelperPath = function(strPath) {
	            WebworkerConfig.helperPath = strPath;
	        };
	        this.setUseHelper = function(bUse) {
	            WebworkerConfig.useHelper = !!bUse;
	        };
	        this.setTransferOwnership = function(bTransfer) {
	            WebworkerConfig.transferOwnership = !!bTransfer;
	        };


	        function Webworker($q) {
	            this.create = function(worker, config) {
	                var win = window,
	                    URL = win.URL || win.webkitURL,
	                    aFuncParts,
	                    strWorker,
	                    blob,
	                    retWorker;

	                // only use this function inside the webworker
	                function _transferable_ (messageData) {
	                    var messageDataTransfers = [];

	                    if (Object.prototype.toString.apply(messageData) != '[object Array]') {
	                        messageData = [messageData];
	                    }

	                    messageData.forEach(function (data) {
	                        if (data instanceof ArrayBuffer) {
	                            messageDataTransfers.push(data);
	                        }
	                    });

	                    return messageDataTransfers;
	                }

	                config = config || {};

	                config = angular.extend(
	                    angular.copy(WebworkerConfig),
	                    config
	                );


	                // stupid IE thinks Blob Webworkers violate same-origin
	                // stupid Edge thinks it's not IE
	                if (navigator.userAgent.indexOf('MSIE') !== -1 ||
	                    navigator.userAgent.indexOf('Edge') !== -1 ||
	                    navigator.appVersion.indexOf('Trident/') > 0) {
	                    config.useHelper = true;
	                }

	                if (Worker && URL && URL.createObjectURL && (Blob || win.BlobBuilder || win.WebKitBlobBuilder || win.MozBlobBuilder)) {
	                    if (typeof worker == CONST_FUNCTION) {
	                        config.external = false;
	                        if (!config.useHelper) {
	                            aFuncParts = /function\s*(\w*)(.*)/.exec(worker.toString());
	                            aFuncParts[1] = aFuncParts[1] || "a"; // give unnamed functions a name.

	                            // reconstruct function signature
	                            strWorker = "function " + aFuncParts[1] + aFuncParts[2];
	                            strWorker +=  worker.toString().substring(aFuncParts[0].length);

	                            strWorker += ";onmessage=function(e){" +
	                                ";var result = " + aFuncParts[1] + ".apply(null,e.data);" +
	                                // lets just try to make it transferable
	                                "postMessage(['"+ CONST_RETURN +"', result], !_async_ ? _transferable_(result) : [])" +
	                            "};";

	                            // add async and transferable function to worker
	                            strWorker += "var _async_ = "+ config.async +";" + _transferable_.toString();

	                            if (win.Blob) {
	                                blob = new Blob([complete, notify, strWorker], {type: 'application/javascript'});
	                            } else if (win.BlobBuilder || win.WebKitBlobBuilder || win.MozBlobBuilder || win.MSBlobBuilder) { // Backwards-compatibility
	                                // WARNING: This isn't tested well because I can can't find any
	                                //          other browser other than PhantomJS to test with
	                                win.BlobBuilder = win.BlobBuilder || win.WebKitBlobBuilder || win.MozBlobBuilder || win.MSBlobBuilder;
	                                blob = new BlobBuilder();
	                                blob.append(complete);
	                                blob.append(notify);
	                                blob.append(strWorker);
	                                blob = blob.getBlob();
	                            }
	                        }

	                        try {
	                            if (config.useHelper) {
	                                aFuncParts = /function\s*(\w*)(.*)/.exec(worker.toString());
	                                aFuncParts[1] = aFuncParts[1] || "a"; // give unnamed functions a name.

	                                // reconstruct function signature
	                                strWorker = "function " + aFuncParts[1] + aFuncParts[2];
	                                strWorker +=  worker.toString().substring(aFuncParts[0].length);

	                                // add async and transferable function to worker
	                                //strWorker += ";var _async_ = "+ config.async +";" + transferable.toString();
	                                retWorker = new WebworkerGenerator(strWorker, config);
	                            } else {
	                                retWorker = new WebworkerGenerator(URL.createObjectURL(blob), config);
	                            }
	                        } catch(e) {}

	                    } else {
	                        // assume it is a string, and hope for the best
	                        config.external = true;
	                        retWorker = new WebworkerGenerator(worker, config);

	                    // } else {
	                    // we can't do webworkers.
	                    // FUTURE: Lets shim it. Maybe a timeout?
	                    }
	                }

	                return retWorker;
	            };

	            function WebworkerGenerator(worker, config) {
	                var noop = function() {};

	                if (config.external || !config.useHelper) {
	                    this.oWorker = new Worker(worker);
	                } else {
	                    this.oWorker = new Worker(WebworkerConfig.helperPath);
	                    this.strWorkerFunc = worker;
	                }

	                // setup default events so they will always be there
	                this.config = angular.extend({
	                    onMessage: noop,
	                    onError: noop,
	                    onReturn: noop,
	                    onComplete: noop,
	                    onNotice: noop
	                }, config);

	                // support webworker lowercase style
	                if (config.onmessage) {
	                    this.config.onMessage = config.onmessage;
	                    this.config.onError = config.onerror;
	                }
	            }

	            //TODO: save copy of promise/worker pair so we can terminate
	            WebworkerGenerator.prototype.run = function() {
	                var oDeferred = $q.defer(),
	                    self = this,
	                    messageData;

	                this.oWorker.onmessage = function(oEvent) {
	                    var strType,
	                        oData = oEvent.data;

	                    if (self.config.external && !self.config.async) {
	                        oDeferred.resolve(oData);
	                    } else {
	                        strType = oEvent.data.shift();
	                        oData = oEvent.data[0];

	                        self.config.onMessage(oEvent);

	                        // don't notify if we are complete or return
	                        if (strType != CONST_COMPLETE && strType != CONST_RETURN) {
	                            oDeferred.notify(oData);
	                        }

	                        if (strType == CONST_RETURN) {
	                            if (!self.config.async) {
	                                oDeferred.resolve(oData);
	                            }
	                            self.config.onReturn(oData);
	                        } else if (strType == CONST_COMPLETE) {
	                            oDeferred.resolve(oData);
	                            self.config.onComplete(oData);
	                        } else if (strType == CONST_NOTICE) {
	                            self.config.onNotice(oData);
	                        }
	                    }
	                };

	                this.oWorker.onerror = function(oError) {
	                    oDeferred.reject(oError);
	                };

	                if (self.config.external || !self.config.useHelper) {
	                    //FUTURE: Use Array.slice(arguments) when available for V8 optimization
	                    messageData = Array.prototype.slice.call(arguments);
	                } else {
	                    //FUTURE: Use Array.slice(arguments) when available for V8 optimization
	                    messageData = {
	                        fn: self.strWorkerFunc,
	                        args: Array.prototype.slice.call(arguments)
	                    };
	                }

	                this.oWorker.postMessage(messageData, transferable(messageData, this));

	                if (!self.config.external && !self.config.useHelper) {
	                    oDeferred.promise.finally(function () {
	                        // Every time run happens on a dynamic web worker it
	                        // creates a new web worker to prevent a thread leak,
	                        // a worker will only last once
	                        self.terminate();
	                    });
	                }

	                return oDeferred.promise;
	            };

	            WebworkerGenerator.prototype.stop = function() {
	                this.oWorker.onerror(new Error('stopped'));
	                this.terminate();
	            };

	            WebworkerGenerator.prototype.terminate = function() {
	                this.oWorker.terminate();
	            };

	            function transferable(messageData, worker) {
	                // FUTURE: CanvasProxy and MessagePort when browsers support it.
	                var messageDataTransfers = [];

	                // the worker_wrapper helper doesn't support transfers right now
	                if (worker.config.transferOwnership && !worker.config.useHelper) {
	                    angular.forEach(messageData, function(data) {
	                        if (data instanceof ArrayBuffer) {
	                            messageDataTransfers.push(data);
	                        }
	                    });
	                }

	                return messageDataTransfers;
	            }

	            function complete(mVal) {
	                // _transferable_ is added to the worker
	                postMessage(["complete", mVal], _transferable_(mVal))
	            }
	            function notify(mVal) {
	                postMessage(["notice", mVal])
	            }
	        }

	        this.$get = ['$q', function($q) {
	            return new Webworker($q);
	        }];
	    });


	    return oWebworkerModule;
	});


/***/ },
/* 50 */
/***/ function(module, exports) {

	"use strict";
	var MovieLoader = (function () {
	    /* @ngInject */
	    function MovieLoader(Webworker, $http, $q) {
	        this.Webworker = Webworker;
	        this.$http = $http;
	        this.$q = $q;
	        this.cinemaWorker = Webworker.create(this.filterCinemaData);
	    }
	    MovieLoader.$inject = ["Webworker", "$http", "$q"];
	    MovieLoader.prototype.getMovies = function () {
	        var _this = this;
	        return this.loadMovies().then(function (allMovies) {
	            _this.allMovies = allMovies;
	            return _this.allMovies;
	        });
	    };
	    //Use this api to load movie info: http://www.omdbapi.com/t=en_text
	    MovieLoader.prototype.loadMovies = function () {
	        var _this = this;
	        var enMovies = this.$http.get('data/allMovies.json').then(function (responseData) {
	            return responseData.data;
	        });
	        var czMovies = this.$http.get('data/allMoviesCZ.json').then(function (responseData) {
	            return responseData.data;
	        });
	        return this.$q.all([enMovies, czMovies]).then(function (data) {
	            console.log(data);
	            _this.allMovies = data;
	            return data[1];
	        });
	    };
	    MovieLoader.prototype.filterCinemaData = function (data) {
	    };
	    return MovieLoader;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = MovieLoader;


/***/ }
/******/ ]);
//# sourceMappingURL=cinema_browser.js.map