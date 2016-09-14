///<reference path="../tsd.d.ts"/>
import * as moment from 'moment';

export default class BasicInformationLoader {
  private allCinemas: any = {};
  public selectedItem: any;
  public selectedTime: any;
  public informationSubject: any;
  /* @ngInject */
  constructor(private $http: ng.IHttpService) {
    this.informationSubject = new Rx.Subject();
    this.selectedTime = moment().startOf('day');
    this.sendNext({changed: 'date'});
  }

  public getCinemas(): any {
    return this.loadCinemas().then((allCinemas) => {
      this.allCinemas = allCinemas;
      return this.allCinemas;
    });
  }

  private loadCinemas(): ng.IPromise<any> {
    return this.$http.get('data/basic_info.json').then((responseData) => {
      return responseData.data;
    });
  }

  public sendNext(data) {
    this.informationSubject.onNext(data);
  }

  public setAllCinemas(allCinemas) {
    this.allCinemas = allCinemas;
  }
}
