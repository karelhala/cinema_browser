///<reference path="../../tsd.d.ts"/>

import TimelineController from './timelineController';

export default class TimelineComponent implements ng.IComponentOptions {
  public replace: boolean = true;
  public template = require<string>('./timeline.html');
  public controller = TimelineController;
  public controllerAs: string = 'vm';
  public bindings: any = {
  };
}
