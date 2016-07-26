///<reference path="../tsd.d.ts"/>
import * as moment from 'moment';

export default class SchoolLoader {
   private schoolData: any = {};

  /* @ngInject */
  constructor(private $http: ng.IHttpService) {
  }
  public getJobsData(): any {
    if (this.schoolData.length > 0) {
      return this.schoolData;
    } else {
      return this.loadSchoolsObject().then((schoolData) => {
        this.schoolData.data = schoolData;
        this.fillObject(schoolData);
        return this.schoolData;
      });
    }
  }

  private fillObject(record) {
    this.schoolData.graphData = {
      colors: {},
      type: '',
      data: [],
      names: {}
    };
    angular.forEach(record, (oneChool: any) => {
      this.schoolData.graphData.colors[oneChool.id] = oneChool.color;
      this.schoolData.graphData.names[oneChool.id] = oneChool.name;
      let data = moment.duration(moment(oneChool.outTime).diff(moment(oneChool.inTime)));
      this.schoolData.graphData.data.push([oneChool.id, Math.round(data.asMonths())]);
    });
  }

  private loadSchoolsObject(): ng.IPromise<any> {
    return this.$http.get('/data/schools.json').then((responseData) => {
      return responseData.data;
    });
  }
}
