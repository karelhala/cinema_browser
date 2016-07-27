///<reference path="../tsd.d.ts"/>
export default class BasicInformationController {
  private personData: any;
  public direction: string = 'down';
  public label: string;
  public items: any[];
  public container: any;
  /* @ngInject */
  constructor(private $window: any, private basicInformationLoader: any) {
    this.label = 'Kino';
    basicInformationLoader.getCinemas().then(items => this.items = items);
  }

  public scrollToElement(item: any) {
    if (item.scrollTo) {
      const element = angular.element(document.getElementById(item.scrollTo));
      this.container.scrollToElementAnimated(element, 0, 400);
    }
  }

  public onCinemaSelect(item) {
    console.log(item);
  }
}

