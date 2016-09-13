///<reference path="../../tsd.d.ts"/>
import DateChosser from './dateChooserComponent';

export default (module: ng.IModule) => {
  module.component('ccDateChooser', new DateChosser);
}
