///<reference path="../tsd.d.ts"/>
import toolbar from './toolbar/loader';
import timeline from './timeline/loader';
import contacts from './contacts/loader';
import graphs from './graphs/loader';
import dateChoosers from './dateChoose/loader';

import TriggerDirective from './triggerDrective';

export default (module: ng.IModule) => {
  toolbar(module);
  timeline(module);
  contacts(module);
  graphs(module);
  dateChoosers(module);
  module.directive('ccTrigger', TriggerDirective.Factory());
}
