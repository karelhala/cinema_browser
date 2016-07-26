///<reference path="../../tsd.d.ts"/>

export default class TimelineController {
  public entries: any[];
  public personData: any;
  private container: any;
  private static get offset() {return 100;};

  constructor(private timelineLoader: any,
              private basicInformationLoader: any,
              private $window: any) {
    this.container = angular.element(document.getElementById('content-container'));
    let person = this.basicInformationLoader.getPersonObject();
    if (person.hasOwnProperty('$$state')) {
      person.then((personData) => {
        this.personData = personData;
      });
    }
    let timeline = this.timelineLoader.getTimelineData();
    if (timeline.hasOwnProperty('$$state')) {
      timeline.then((timelineData) => {
        this.entries = timelineData;
        setTimeout(() => {
          this.showVisible();
        });
      });
    } else {
      setTimeout(() => {
        this.showVisible();
      });
    }
    this.container.on('scroll', () => {
      this.showVisible();
    });
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
