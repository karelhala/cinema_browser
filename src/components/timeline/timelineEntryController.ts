///<reference path="../../tsd.d.ts"/>

export default class TimelineEntryController {
  public isLeft: boolean;
  public keyData: any;
  public entry: any;
  public speedDialOptions: any;

  /* @ngInject */
  public constructor(private $window: any, private basicInformationLoader: any) {
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
    ]
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
    const buyUrl = this.basicInformationLoader.selectedItem.actionObject.ticketUrls.ECOM.ticketUrl;
    TimelineEntryController.openNewTab(buyUrl, item);
  }

  public onReserveClick(item) {
    const resUrl = this.basicInformationLoader.selectedItem.actionObject.ticketUrls.RES.ticketUrl;
    TimelineEntryController.openNewTab(resUrl, item);
  }

  private static openNewTab(url, item) {
    const indexOfVar = url.indexOf('$PrsntCode$');
    var win = window.open(url.substr(0, indexOfVar) + item.pc, '_blank');
    win.focus();
  }
}
