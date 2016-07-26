///<reference path="../../tsd.d.ts"/>

export default class GraphTileComponent implements ng.IComponentOptions {
  public replace: boolean = true;
  public template = require<string>('./big-tile.html');
  public controllerAs: string = 'vm';
  public bindings: any = {
  };

  constructor(public controller: any) {}
}
