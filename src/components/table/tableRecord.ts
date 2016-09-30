/**
 *
 * @memberof
 * @ngdoc controller
 * @name tableRecordController
 */
export class TableRecordController {
  public entry: any;
  public speedDialOptions: any[];
  public selectedCinema: any;

  constructor() {
    this.initOptions();
  }

  private initOptions() {
    this.speedDialOptions = [
      {
        tooltip: 'Koupit',
        tooltipDirection: 'bottom',
        icon: 'add_shopping_cart',
        type: 'buy',
        callFn: (item) => this.onBuyClick(item)
      },
      {
        tooltip: 'Rezervace',
        tooltipDirection: 'top',
        icon: 'today',
        type: 'reserve',
        callFn: (item) => this.onReserveClick(item)
      },
      {
        tooltip: 'Info',
        tooltipDirection: 'top',
        icon: 'info_outline',
        type: 'info',
        callFn: (item) => this.onInfoClick(item)
      }
    ];
  }

  public onItemClick(item: any, oneEntry) {
    oneEntry.isOpen = !oneEntry.isOpen;
    item.callFn(oneEntry);
  }

  public onInfoClick(item) {
    console.log('info', item);
  }

  public onBuyClick(item) {
    const buyUrl = `https://sr.cinemacity.cz/SalesCZ/OpenNewSession.aspx?url=default.aspx$key=${this.selectedCinema.type}~EC=${item.pc}~u=0`;
    TableRecordController.openNewTab(buyUrl);
  }

  public onReserveClick(item) {
    const resUrl = `https://sr.cinemacity.cz/ReservationsCZ/OpenNewSession.aspx?url=default.aspx$key=${this.selectedCinema.type}~EC=${item.pc}~u=0`;
    TableRecordController.openNewTab(resUrl);
  }

  private static openNewTab(url) {
    let win = window.open(url, '_blank');
    win.focus();
  }
}

/**
 * @description
 * @memberof
 * @ngdoc component
 * @example
 */
export default class TableRecordComponent {
    public replace: boolean = true;
    public template = require<string>('./table-record.html');
    public controller: any = TableRecordController;
    public transclude: boolean = true;
    public controllerAs: string = 'recordCtrl';
    public bindings: any = {
      keyData: '<',
      entry: '<',
      selectedCinema: '<',
      onClick: '&'
    };
}
