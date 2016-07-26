///<reference path="../tsd.d.ts"/>
export default class BasicInformationController {
  private personData: any;
  public direction: string = 'down';
  public items: any[];
  public container: any;
  /* @ngInject */
  constructor(private $window: any, private basicInformationLoader: any) {
    this.initSpeedDial();
    this.container = angular.element(document.getElementById('content-container'));
    let person = this.basicInformationLoader.getPersonObject();
    if (person.hasOwnProperty('$$state')) {
      person.then((personData) => {
        this.personData = personData;
      });
    }
  }

  public scrollToElement(item: any) {
    if (item.scrollTo) {
      const element = angular.element(document.getElementById(item.scrollTo));
      this.container.scrollToElementAnimated(element, 0, 400);
    }
  }

  private initSpeedDial() {
    this.items = [
      {
        tooltip: 'Velký Špalíček',
        tooltipDirection: 'right',
        icon: 'account_balance',
      },
      {
        tooltip: 'Olympia',
        tooltipDirection: 'right',
        icon: 'shopping_cart',
      }
    ];
  }
}
