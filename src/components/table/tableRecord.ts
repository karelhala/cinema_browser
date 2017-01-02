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

  /* @ngInject */
  constructor(private movieLoader: any, public $mdDialog: any) {
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

  public showDialog(itemData, infoData) {
    this.$mdDialog.show({
      clickOutsideToClose: true,
      fullscreen: true,
      template: `<md-dialog aria-label="${itemData.fn}">
                  <form ng-cloak>
                      <md-toolbar>
                        <div class="md-toolbar-tools">
                          <h2>${itemData.fn}</h2>
                          <span flex></span>
                          <md-button class="md-icon-button" ng-click="cancel()">
                            <md-icon aria-label="Close dialog">clear</md-icon>
                          </md-button>
                        </div>
                      </md-toolbar>
                      <md-dialog-content style="padding: 10px;">
                        <div style="display: inline-block">
                          <img src="${infoData.movieInfo.img.src}">
                        </div>
                        <div style="display: inline-block; vertical-align: top;">
                          <div><span>CSFD: </span><span>${infoData.movieRating}</span></div>
                          <div>
                            ${infoData.basicData}
                          </div>
                          <div>
                            <h3>Popis:</h3>
                            <div style="width: 950px;">
                              ${infoData.plotInfo.content}
                            </div>
                          </div>
                        </div>
                      </md-dialog-content>
                  </form>
      </md-dialog>`,
      controller: function DialogController($scope, $mdDialog) {
        $scope.closeDialog = function() {
          $mdDialog.hide();
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };
      }
    });
  }

  public onItemClick(item: any, oneEntry) {
    oneEntry.isOpen = !oneEntry.isOpen;
    item.callFn(oneEntry);
  }

  public onInfoClick(item) {
    this.movieLoader.getMovieInfo(item.fn).then(data => {
      this.showDialog(item, data);
    });
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
