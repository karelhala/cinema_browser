///<reference path="../../tsd.d.ts"/>
import * as moment from 'moment';
export default class TimelineController {
  public entries: any[] = [];
  public timeData: any;
  private container: any;
  private static get offset() {return 100;};

  constructor(private timelineLoader: any,
              private basicInformationLoader: any,
              private $window: any) {
    this.container = angular.element(document.getElementById('content-container'));
    this.container.on('scroll', () => {
      this.showVisible();
    });
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
    if (data.changed === 'cinema' || data.changed === 'date') {
      if (this.basicInformationLoader.selectedItem) {
        this.selectCurrentMovies();
      }
    }
  }

  public selectCurrentMovies() {
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
  }

  public onFailAndClose() {
    console.log('fail and close');
  }

  private showVisible() {
    const timelineEntries = document.getElementsByClassName('timeline-entry');
    angular.forEach(timelineEntries, (oneEntry, key) => {
      if ((Math.abs(oneEntry.getBoundingClientRect().top + TimelineController.offset)) < this.$window.innerHeight) {
        if (this.entries[key]) {
          this.entries[key].isVisible = true;
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
