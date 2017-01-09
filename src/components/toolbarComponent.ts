export default class ToolbarComponent implements ng.IComponentOptions {
  public replace: boolean = true;
  public template = require<string>('./toolbar.html');
  public controller = 'basicInformationController as basic';
  public controllerAs: string = 'vm';
  public bindings: any = {};
}
