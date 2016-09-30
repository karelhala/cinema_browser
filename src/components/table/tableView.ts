import * as moment from 'moment';
/**
 *
 * @memberof
 * @ngdoc controller
 * @name tableViewController
 */
export class TableViewController {
  public entries: any[];
  public width: string;
  /* @ngInject */
  constructor(public basicInformationLoader: any) {
    this.subscribeToInformationLoader();
    if (this.basicInformationLoader.selectedItem) {
      this.selectCurrentMovies();
    }
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
    _.each(this.entries, (entry, key) => {
      this.entries[key] = {data: entry};
    });
    this.width = `${100 / Object.keys(this.entries).length}%`;
  }

  public onFailAndClose() {
    console.log('fail and close');
  }

  public getNumberOfRow(key) {
    return Object.keys(this.entries).indexOf(key) % 4;
  }
}

/**
 * @description
 * @memberof
 * @ngdoc component
 * @example
 */
export default class TableViewComponent {
    public replace: boolean = true;
    public template = require<string>('./table-view.html');
    public controller: any = TableViewController;
    public transclude: boolean = true;
    public controllerAs: string = 'tableCtrl';
    public bindings: any = {};
}
