///<reference path="../tsd.d.ts"/>
import BasicInformationLoader from './basicInformationLoader';
import TimelineLoader from './timelineLoader';
import ContactLoader from './contactLoader';
import JobsLoader from './jobsLoader';
import SchoolLoader from './schoolLoader';

export default (module: ng.IModule) => {
  module.service('basicInformationLoader', BasicInformationLoader);
  module.service('timelineLoader', TimelineLoader);
  module.service('contactLoader', ContactLoader);
  module.service('jobsLoader', JobsLoader);
  module.service('schoolLoader', SchoolLoader);
}
