///<reference path="../tsd.d.ts"/>
import toolbar from './toolbar/loader';
import timeline from './timeline/loader';
import contacts from './contacts/loader';
import graphs from './graphs/loader';
import dateChoosers from './dateChoose/loader';
import table from './table/loader';
import searcher from './movieSearch/loader';
import HomeContent from './homeContent';

import TriggerDirective from './triggerDrective';
import ToolbarComponent from './toolbarComponent';
import CinemaLocatorComponent from './cinemaLocator';

export default (module: ng.IModule) => {
  searcher(module);
  table(module);
  toolbar(module);
  timeline(module);
  contacts(module);
  graphs(module);
  dateChoosers(module);
  module.directive('ccTrigger', TriggerDirective.Factory());
  module.component('ccHomeContent', new HomeContent);
  module.component('ccToolbar', new ToolbarComponent);
  module.component('ccLocator', new CinemaLocatorComponent);
};
