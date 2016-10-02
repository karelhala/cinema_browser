/**
 *
 * @memberof
 * @ngdoc controller
 * @name SearcherController
 */
export class SearcherController {
  public movies: any[] = [];
  public selectedMovies: any[] = [];
  public searchText = '';
  public a;
  /* @ngInject */
  constructor(public basicInformationLoader: any, private $scope: any) {
    this.subscribeToInformationLoader();
  };

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
        this.movies = this.basicInformationLoader.selectedItem.movies.pr;
      }
    }
  }

  public onMovieSelected() {
    this.basicInformationLoader.filteredItems = this.selectedMovies;
    this.basicInformationLoader.sendNext({changed: 'filtered'});
    setTimeout(() => {
      document.querySelector('#autoCompleteId')['blur']();
    },0);
  }

  public querySearch(searchText) {
    return searchText ? this.movies.filter(this.createFilterFor(searchText)) : [];
  }

  public createFilterFor(query) {
    let lowercaseQuery = angular.lowercase(query);

    return function filterFn(movie) {
      let nameLower = angular.lowercase(movie.fn);
      return (nameLower.indexOf(lowercaseQuery) !== -1);
    };
  }

  public onFailAndClose() {
    console.log('fail and close');
  }
}

/**
 * @description
 * @memberof
 * @ngdoc component
 * @example
 */
export default class SearcherComponent {
    public replace: boolean = true;
    public template = require<string>('./movie-searcher.html');
    public controller: any = SearcherController;
    public transclude: boolean = true;
    public controllerAs: string = 'seaCtrl';
    public bindings: any = {};
}
