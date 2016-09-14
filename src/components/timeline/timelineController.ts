///<reference path="../../tsd.d.ts"/>
import * as moment from 'moment';
export default class TimelineController {
  public entries: any[] = [];
  public personData: any;
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
    if (data.changed === 'cinema') {
      this.selectCurrentMovies();
    }
  }

  public selectCurrentMovies() {
    Object.keys(this.basicInformationLoader.selectedItem.movies.filtered).forEach(item => {
      if (moment(item, 'DD/MM/YYYY').toDate() === this.basicInformationLoader.selectedTime.toDate()) {
        this.entries = this.basicInformationLoader.selectedItem.movies.filtered[item];
      }
    });
    if (this.entries.length === 0) {
      let firstKey = Object.keys(this.basicInformationLoader.selectedItem.movies.filtered)[0];
      this.entries = this.basicInformationLoader.selectedItem.movies.filtered[firstKey];
    }
    console.log(this.basicInformationLoader, this.entries);
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
