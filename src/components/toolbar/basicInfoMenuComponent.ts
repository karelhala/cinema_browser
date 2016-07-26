///<reference path="../../tsd.d.ts"/>

import BasicMenuController from './basicMenuController';

export default class BasicMenuComponent implements ng.IComponentOptions {
  public replace: boolean = true;
  public template = require<string>('./basic-info-menu.html');
  public controller = BasicMenuController;
  public controllerAs: string = 'vm';
  public bindings: any = {
    personObject: '='
  };
}
