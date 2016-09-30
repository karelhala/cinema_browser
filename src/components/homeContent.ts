/**
 *
 * @memberof
 * @ngdoc controller
 * @name homeContentController
 */
export class HomeContentController {
  public allViews: any[];
  public currentView: any;
  /* @ngInject */
  constructor(private $state: any, private $window: any) {
    this.initViews();
    if (this.$window.innerWidth < 680) {
      this.currentView = this.allViews[0];
      this.$state.transitionTo(this.currentView.route);
      this.allViews.splice(1,1);
      console.log(this);
    } else {
      this.currentView = this.allViews[1];
      this.$state.transitionTo(this.currentView.route);
    }
  }

  private initViews() {
    this.allViews = [
      {
        type: 'timeline',
        route: 'home.timeline',
        tooltip: 'Timeline',
        icon: 'share'
      }, {
        type: 'table',
        route: 'home.table',
        tooltip: 'Table',
        icon: 'view_week'
      }
    ];
  }

  public onItemClick(item) {
    this.currentView = item;
    setTimeout(() => {this.$state.transitionTo(item.route);});
  }
}

/**
 * @description
 * @memberof
 * @ngdoc component
 * @example
 */
export default class HomeContentComponent {
    public replace: boolean = true;
    public template = require<string>('./home-content.html');
    public controller: any = HomeContentController;
    public transclude: boolean = true;
    public controllerAs: string = 'homeCtrl';
    public bindings: any = {};
}
