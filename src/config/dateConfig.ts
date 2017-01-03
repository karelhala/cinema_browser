import * as moment from 'moment';

export default (module: ng.IModule) => {
  module
  .config($mdDateLocaleProvider => {
    $mdDateLocaleProvider.formatDate = (date) => {
      return date ? moment(date).format('DD.MM.YYYY') : '';
    };

    $mdDateLocaleProvider.parseDate = (dateString) => {
      let m = moment(dateString, 'DD.MM.YYYY', true);
      return m.isValid() ? m.toDate() : new Date(NaN);
    };
  });
};
