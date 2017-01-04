///<reference path="../tsd.d.ts"/>
class TriggerLink {
  /* @ngInject */
  constructor(scope, element) {
    scope.$watch('activate', (isActive) => {
      if (isActive) {
        scope.trigger();
      }
    });

    scope.trigger = () => {
      if (element && element.find(scope.elementName)) {
        setTimeout(() => {
          element.find(scope.elementName).triggerHandler(scope.eventName);
        });
      }
    };
  }
}

export default class TriggerDirective implements ng.IDirective {
  public replace: boolean = false;
  public link = TriggerLink;
  public scope: any = {
    activate: '<',
    eventName: '@',
    elementName: '@'
  };

  public static Factory = () => {
    let directive: ng.IDirectiveFactory = () => new TriggerDirective();
    directive.$inject = [];
    return directive;
  }
}
