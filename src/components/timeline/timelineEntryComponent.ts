///<reference path="../../tsd.d.ts"/>

import TimeLineEntryController from './timelineEntryController';

export default class TimelineEntryComponent implements ng.IComponentOptions {
  public replace: boolean = true;
  public template = require<string>('./timeline-entry.html');
  public controller = TimeLineEntryController;
  public controllerAs: string = 'vm';
  public bindings: any = {
    isLeft: '=',
    personObject: '=',
    entry: '='
  };
}
