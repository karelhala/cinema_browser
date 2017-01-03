import * as moment from 'moment';
import * as _ from 'lodash';
/**
 *
 * @memberof
 * @ngdoc controller
 * @name tableViewController
 */
export class TableViewController {
  public entries: any[];
  public width: string;
  public rowWidth: string;
  public currentRow: number = 0;
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
    let modRows = Object.keys(this.entries).length % 3;
    this.width = `${100 / (Object.keys(this.entries).length + modRows + 1)}%`;
    this.rowWidth = `${(100 / (Object.keys(this.entries).length + modRows + 1)) * 3}%`;
  }

  public initRow() {
    this.currentRow = 0;
    return true;
  }

  public addRow() {
    this.currentRow++;
    return true;
  }

  public onFailAndClose() {
    console.log('fail and close');
  }

  public getKeyAsNumber(key) {
    return parseInt(key, 10);
  }

  public getNumberOfRow(key) {
    return Object.keys(this.entries).indexOf(key + '') % 3;
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
