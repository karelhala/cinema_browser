///<reference path="../../tsd.d.ts"/>
import BasicMenuComponent from './basicInfoMenuComponent';
import SpeedDialComponent from './speedDialComponent';
import SelectComponent from './selectDirective';

export default (module: ng.IModule) => {
  module.component('basicInfoMenu', new BasicMenuComponent);
  module.component('speedDial', new SpeedDialComponent);
  module.directive('ccSelect', SelectComponent.Factory());
};
