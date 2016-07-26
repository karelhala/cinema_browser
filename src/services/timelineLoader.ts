///<reference path="../tsd.d.ts"/>
import * as moment from 'moment';

export default class TimelineLoader {
  private timelineData: any = {};

  /* @ngInject */
  constructor(private $http: ng.IHttpService) {
  }

  public getTimelineData(): any {
    if (this.timelineData.length > 0) {
      return this.timelineData;
    } else {
      return this.loadTimelineObject().then((timelineData) => {
        angular.forEach(timelineData, (oneRecord) => {
          this.fillObject(oneRecord);
        });
        this.timelineData = timelineData;
        return this.timelineData;
      });
    }
  }

  private fillObject(record) {
    record.isVisible = false;
    record.timeObject = moment(record.time);
    record.getTime = () => {
      let timeString = '';
      record.diffTime = moment.duration(moment().diff(record.time));
      if (record.diffTime.years() !== 0) {
        timeString += record.diffTime.years() + ' years ';
      }
      if (record.diffTime.months() !== 0) {
        timeString += record.diffTime.months() + ' months ';
      }
      if (record.diffTime.days() !== 0) {
        if (timeString.length !== 0) {
          timeString += 'and ';
        }
        timeString += record.diffTime.days() + ' days ';
      }
      timeString += 'ago';
      return timeString;
    };
  }

  private loadTimelineObject(): ng.IPromise<any> {
    return this.$http.get('/data/timeline.json').then((responseData) => {
      return responseData.data;
    });
  }
}
