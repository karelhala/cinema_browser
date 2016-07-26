///<reference path="../../tsd.d.ts"/>

import TimelineComponent from './timelineComponent';
import TimelineEntryComponent from './timelineEntryComponent';

export default (module: ng.IModule) => {
  module.component('timeline', new TimelineComponent);
  module.component('timelineEntry', new TimelineEntryComponent);
}
