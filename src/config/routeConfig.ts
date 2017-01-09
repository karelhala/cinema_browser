///<reference path="../tsd.d.ts"/>

export default (module: ng.IModule) => {
  module
  .config(($stateProvider, $locationProvider, $urlRouterProvider) => {
    $stateProvider.state({
      name: 'home',
      template: require<string>('../views/home_content.html'),
      controller: 'basicInformationController as basic'
    })
    .state({
      name: 'cinema',
      template: require<string>('../views/cinema_content.html'),
    })
    .state('cinema.timeline', {
      template: `<timeline></timeline>`
    })
    .state('cinema.table', {
      template: `<cc-table></cc-table>`
    });
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode({
        enabled: false,
        requireBase: false
      });
    })
    .run(($state) => {
      $state.go('home');
    });
};
