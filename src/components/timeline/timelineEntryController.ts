///<reference path="../../tsd.d.ts"/>

export default class TimelineEntryController {
  public isLeft: boolean;
  public keyData: any;
  public entry: any;
  public speedDialOptions: any;
  public selectedCinema: any;

  /* @ngInject */
  public constructor(private $window: any, private movieLoader: any, private $mdDialog: any) {
    this.initOptions();
  }

  public initOptions() {
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
      controller: ['$scope', '$mdDialog', function DialogController($scope, $mdDialog) {
        $scope.closeDialog = function() {
          $mdDialog.hide();
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };
      }]
    });
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
    oneEntry.isOpen = !oneEntry.isOpen;
    item.callFn(oneEntry);
  }

  public onInfoClick(item) {
    if (!item.hasOwnProperty('infoData')) {
      this.movieLoader.getMovieInfo(item.fn).then(data => {
        item.infoData = data;
        this.showDialog(item, data);
      });
    } else {
      this.showDialog(item, item.infoData);
    }
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
