///<reference path="../../tsd.d.ts"/>

export default class BasicMenuController implements ng.IComponentOptions {
  public personObject: any;
  public openMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  }
}
