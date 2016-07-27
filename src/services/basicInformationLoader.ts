///<reference path="../tsd.d.ts"/>
import * as moment from 'moment';

export default class BasicInformationLoader {
  private allCinemas: any = {};

  /* @ngInject */
  constructor(private $http: ng.IHttpService) {
  }

  public getCinemas(): any {
    return this.loadCinemas().then((allCinemas) => {
      this.allCinemas = allCinemas;
      return this.allCinemas;
    });
  }

  private loadCinemas(): ng.IPromise<any> {
    return this.$http.get('/data/basic_info.json').then((responseData) => {
      return responseData.data;
    });
  }
}
