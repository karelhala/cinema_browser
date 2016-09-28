///<reference path="../../tsd.d.ts"/>

export default class TimelineEntryController {
  public isLeft: boolean;
  public keyData: any;
  public entry: any;
  public speedDialOptions: any;
  public selectedCinema: any;

  /* @ngInject */
  public constructor(private $window: any) {
    this.initOptions();
  }

  public initOptions() {
    this.speedDialOptions = [
      {
        tooltip: 'Info',
        tooltipDirection: 'top',
        icon: 'info_outline',
        type: 'info',
        callFn: (item) => this.onInfoClick(item)
      },
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
      }
    ];
  }

  public getCurrentClasses() {
    return {
      'left-aligned': this.isLeft && this.$window.innerWidth > 960
    };
  }

  public bounce() {
    return {
      'is-hidden': !this.entry.isVisible,
      'bounce-in': this.entry.isVisible
    };
  }

  public onItemClick(item: any, oneEntry) {
    item.callFn(oneEntry);
  }

  public onInfoClick(item) {
    console.log('info', item);
  }

  public onBuyClick(item) {
    const buyUrl = `https://sr.cinemacity.cz/SalesCZ/OpenNewSession.aspx?url=default.aspx$key=${this.selectedCinema.type}~EC=${item.pc}~u=0`;
    TimelineEntryController.openNewTab(buyUrl);
  }

  public onReserveClick(item) {
    const resUrl = `https://sr.cinemacity.cz/ReservationsCZ/OpenNewSession.aspx?url=default.aspx$key=${this.selectedCinema.type}~EC=${item.pc}~u=0`;
    TimelineEntryController.openNewTab(resUrl);
  }

  private static openNewTab(url) {
    let win = window.open(url, '_blank');
    win.focus();
  }
}
