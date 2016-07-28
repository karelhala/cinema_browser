///<reference path="../tsd.d.ts"/>
import moment = require("moment/moment");

export default class BasicInformationController {
  private personData: any;
  public direction: string = 'down';
  public label: string;
  public items: any[];
  public container: any;
  public cinemaDate: any;
  public activateSelect: boolean = false;
  public activateDatePicker: boolean = false;
  public minDate: any;
  /* @ngInject */
  constructor(private $window: any, private basicInformationLoader: any, private $scope: any) {
    this.minDate = new Date();
    this.label = 'Kino';
    basicInformationLoader.getCinemas().then(items => this.items = items);
    console.log(this.basicInformationLoader.informationSubject);
    this.basicInformationLoader.informationSubject.subscribe((data) => {
      if (data.hasOwnProperty('clicked')) {
        this.activateSelect = data.clicked === 'cinema';
        this.activateDatePicker = data.clicked === 'date';
      }
    }, () => {}, () => {});
  }

  public scrollToElement(item: any) {
    if (item.scrollTo) {
      const element = angular.element(document.getElementById(item.scrollTo));
      this.container.scrollToElementAnimated(element, 0, 400);
    }
  }

  public onCinemaSelect(item) {
    this.basicInformationLoader.selectedItem = item;
  }

  public getSelectedItem() {
    return this.basicInformationLoader.selectedItem;
  }

  public dateChanged() {
    this.basicInformationLoader.selectedTime = moment(this.cinemaDate);
  }

  public getSelectedDate() {
    if (this.basicInformationLoader.selectedTime) {
      return this.basicInformationLoader.selectedTime.format('DD.MM.YYYY');
    }
  }

  public onCinemaClicked() {
    this.basicInformationLoader.sendNext({clicked: 'cinema'})
  }

  public onDateClicked() {
    this.basicInformationLoader.sendNext({clicked: 'date'})
  }
}

