///<reference path="../../tsd.d.ts"/>
import * as _ from 'lodash';
import * as moment from 'moment';
export default class TimelineController {
  public entries: any[] = [];
  public timeData: any;
  private container: any;
  private static get offset() {return 100;};

  /* @ngInject */
  constructor(private timelineLoader: any,
              public basicInformationLoader: any,
              private $window: any,
              private $scope: any) {
    this.container = angular.element(document.getElementById('content-container'));
    this.container.on('scroll', () => {
      this.showVisible();
    });
    if (this.basicInformationLoader.selectedItem) {
      this.selectCurrentMovies();
    }
    this.subscribeToInformationLoader();
  }

  private subscribeToInformationLoader() {
    this.basicInformationLoader
      .informationSubject
      .subscribe(
        (data) => this.onNextData(data),
        this.onFailAndClose,
        this.onFailAndClose
      );
  }

  public onNextData(data) {
    if (data.changed === 'cinema' || data.changed === 'date' || data.changed === 'filtered') {
      if (this.basicInformationLoader.selectedItem) {
        this.selectCurrentMovies();
      }
    }
  }

  public selectCurrentMovies() {
    this.entries = [];
    Object.keys(this.basicInformationLoader.selectedItem.movies.filtered).forEach(item => {
      let timeData = moment(item, 'DD/MM/YYYY');
      if (timeData.toDate().getTime() === this.basicInformationLoader.selectedTime.toDate().getTime()) {
        this.entries = this.basicInformationLoader.selectedItem.movies.filtered[item];
      }
    });
    if (this.entries.length === 0) {
      let firstKey = Object.keys(this.basicInformationLoader.selectedItem.movies.filtered)[0];
      this.entries = this.basicInformationLoader.selectedItem.movies.filtered[firstKey];
    }
    this.entries = _.cloneDeep(this.entries);
    if (this.basicInformationLoader.filteredItems.length !== 0) {
      _.each(this.entries, (entry, key) => {
        this.entries[key] = entry.filter(movie => {
          return _.findIndex(this.basicInformationLoader.filteredItems, {fn: movie.fn}) !== -1;
        });
      });
    }
    _.each(this.entries, (entry, key) => {
      this.entries[key] = {data: entry};
    });
    let tempEntries: any;
    tempEntries = _.pickBy(this.entries, (entry) => {
      return entry.data.length !== 0;
    });
    this.entries = tempEntries;
    setTimeout(() => this.showVisible());
  }

  public onFailAndClose() {
    console.log('fail and close');
  }

  private showVisible() {
    const timelineEntries = document.getElementsByClassName('timeline-entry');
    angular.forEach(timelineEntries, (oneEntry, key) => {
      if ((Math.abs(oneEntry.getBoundingClientRect().top + TimelineController.offset)) < this.$window.innerHeight) {
        if (this.entries[oneEntry.id]) {
          this.entries[oneEntry.id].isVisible = true;
          this.$scope.$apply();
          if (key + 1 === this.entries.length) {
            this.container.off('scroll');
          }
        }
      }
    });
  }

  public getClass() {
    return {
      'all-right': this.$window.innerWidth < 960
    };
  }
}
