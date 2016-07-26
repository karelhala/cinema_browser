///<reference path="../tsd.d.ts"/>
import * as moment from 'moment';

export default class JobsLoader {
   private jobsData: any = {};

  /* @ngInject */
  constructor(private $http: ng.IHttpService) {
  }
  public getJobsData(): any {
    if (this.jobsData.length > 0) {
      return this.jobsData;
    } else {
      return this.loadJobsObject().then((jobsData) => {
        this.jobsData.data = jobsData;
        this.fillObject(jobsData);
        return this.jobsData;
      });
    }
  }

  private fillObject(record) {
    this.jobsData.graphData = {
      colors: {},
      type: '',
      data: [],
      names: {}
    };
    angular.forEach(record, (oneJob: any) => {
      this.jobsData.graphData.colors[oneJob.id] = oneJob.color;
      this.jobsData.graphData.names[oneJob.id] = oneJob.name;
      let data = moment.duration(moment(oneJob.outTime).diff(moment(oneJob.inTime)));
      this.jobsData.graphData.data.push([oneJob.id, Math.round(data.asMonths())]);
    });
  }

  private loadJobsObject(): ng.IPromise<any> {
    return this.$http.get('/data/jobs.json').then((responseData) => {
      return responseData.data;
    });
  }
}
