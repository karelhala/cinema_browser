///<reference path="../../tsd.d.ts"/>
import * as _ from 'lodash';
class SelectController {
  public selectItems: any[];
  public label: any[];
  public onChange: (args: {item: any}) => void;
  public selectedCinema: any;
  public element;

  public ctrlGetSelected() {
    this.onChange({
      item: _.find(this.selectItems, {text: this.selectedCinema})
    });
  }
}
export default class SelectComponent implements ng.IDirective {
  public replace: boolean = true;
  public template = require<string>('./select.html');
  public controller = SelectController;
  public controllerAs: string = 'ctrl';
  public bindToController: any = {
    selectItems: '<',
    label: '<',
    onChange: '&'
  };

  public static Factory = () => {
    let directive: ng.IDirectiveFactory = () => new SelectComponent();
    directive.$inject = [];
    return directive;
  }
}
