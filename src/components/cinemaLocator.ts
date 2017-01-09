class CinemaLocatorController {
  public items: any;
  public location: any;
  public onCinemaSelected: (args: {item: any}) => void;
  public flexValue: number;
  /* @ngInject */
  constructor(private $state: any) {}

  public $onInit() {
    this.recalculateFlex();
  }

  public $onChanges(changesObj: any) {
    if (changesObj.hasOwnProperty('items')) {
      this.recalculateFlex();
    }
  }

  private recalculateFlex() {
    this.flexValue = (this.items.length + 1 / 100);
  }

  public onItemClick(item) {
    this.onCinemaSelected({item: item});
    this.$state.go('cinema');
  }
}

export default class CinemaLocatorComponent implements ng.IComponentOptions {
  public replace: boolean = true;
  public template = require<string>('./cinema-locator.html');
  public controller = CinemaLocatorController;
  public controllerAs: string = 'vm';
  public bindings: any = {
    location: '<',
    items: '<',
    onCinemaSelected: '&'
  };
}
