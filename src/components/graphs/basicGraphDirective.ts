///<reference path="../../tsd.d.ts"/>

import BasicGraphController from './basicGraphController';

export default class BasicGraphDirective implements ng.IDirective {
  public replace: boolean = true;
  public template = `<div></div>`;
  public controller = BasicGraphController;
  public controllerAs: string = 'vm';
  public scope = {};
  public bindToController: any = {
    type: '=',
    data: '=',
    colors: '=',
    names: '='
  };

  public link = (scope, element, attrs, controller) => {
    scope.$watch(() => {
      return controller.data;
    }, (newData) => {
      if (controller.data) {
        setTimeout(() => {
          scope.chart = c3.generate({
            bindto: element[0],
            data: {
              names: controller.names,
              colors: controller.colors,
              type : controller.type,
              columns: controller.data
            }
          });
        });
      }
    });
    scope.$watch(() => {
      return controller.type;
    }, (newData) => {
      if (scope.chart) {
        scope.chart.transform(controller.type);
      }
    });
    //console.log(element);
  };

  public static Factory = () => {
    let directive = () => new BasicGraphDirective();

    directive.$inject = [];

    return directive;
  };
}
