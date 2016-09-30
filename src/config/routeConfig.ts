///<reference path="../tsd.d.ts"/>

export default (module: ng.IModule) => {
  module
  .config(($stateProvider, $locationProvider, $urlRouterProvider) => {
    $stateProvider.state({
      name: 'home',
      views: {
        toolbar: {
          template: require<string>('../views/home_toolbar.html'),
          controller: 'basicInformationController as basic'
        },
        content: {
          template: require<string>('../views/home_content.html')
        }
      }
    })
    .state('home.timeline', {
      template: `<timeline></timeline>`
    })
    .state('home.table', {
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
}
