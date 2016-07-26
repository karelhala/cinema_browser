///<reference path="../../tsd.d.ts"/>

import SpeedDialController from './speedDialController';

export default class SpeedDialComponent implements ng.IComponentOptions {
  public replace: boolean = true;
  public template = require<string>('./speed-dial.html');
  public controller = SpeedDialController;
  public controllerAs: string = 'vm';
  public bindings: any = {
    direction: '=',
    items: '=',
    onClick: '&'
  };
}
