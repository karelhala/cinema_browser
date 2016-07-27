///<reference path="../../tsd.d.ts"/>

class SelectController {
  public selectItems: any[];
  public label: any[];
  public onChange: (args: {item: any}) => void;
  public selectedCinema: any;

  constructor(){
  }
}

export default class SelectComponent implements ng.IComponentOptions {
  public replace: boolean = true;
  public template = require<string>('./select.html');
  public controller = SelectController;
  public controllerAs: string = 'ctrl';
  public bindings: any = {
    selectItems: '<',
    label: '<',
    onChange: '&'
  };
}
