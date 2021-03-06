///<reference path="../tsd.d.ts"/>
import * as moment from 'moment';
import * as _ from 'lodash';

export default class BasicInformationController {
  public direction: string = 'down';
  public label: string;
  public items: any[];
  public container: any;
  public cinemaDate: any;
  public activateSelect: boolean = false;
  public activateDatePicker: boolean = false;
  public groupedItems: any;
  public minDate: any;
  public maxDate: any;

  /* @ngInject */
  constructor(public basicInformationLoader: any, private movieLoader: any, private $q: any) {
    this.minDate = new Date();
    this.maxDate = moment().add(4, 'day').startOf('day').toDate();
    this.label = 'Kino';
    const movies = this.movieLoader.getMovies();
    const cinemas = this.basicInformationLoader.getCinemas();
    this.$q.all([movies, cinemas]).then(responseData => {
      this.items = this.movieLoader.filterCinemaData({cinemas: responseData[1], movies: responseData[0]});
      this.groupedItems = _.groupBy(this.items, 'location');
      this.basicInformationLoader.setAllCinemas(this.items);
    });
    this.cinemaDate = this.basicInformationLoader.selectedTime.toDate();
    this.subscribeToInformationLoader();
  }

  private subscribeToInformationLoader() {
    this.basicInformationLoader
        .informationSubject
        .subscribe(
          (data) => this.onNextData(data),
          this.onFailAndClose,
          this.onFailAndClose
        );
  }

  private onNextData(data) {
    if (data.hasOwnProperty('clicked')) {
      this.activateSelect = data.clicked === 'cinema';
      this.activateDatePicker = data.clicked === 'date';
      setTimeout(() => {
        this.activateSelect = false;
        this.activateDatePicker = false;
      });
    } else if (data.changed === 'date') {
      this.cinemaDate = this.basicInformationLoader.selectedTime.toDate();
    }
  }

  private onFailAndClose() {
    console.log('Fail or close subject');
  }

  public scrollToElement(item: any) {
    if (item.scrollTo) {
      const element = angular.element(document.getElementById(item.scrollTo));
      this.container.scrollToElementAnimated(element, 0, 400);
    }
  }

  public onCinemaSelect(item) {
    this.basicInformationLoader.selectedItem = item;
    this.basicInformationLoader.sendNext({changed: 'cinema'});
  }

  public getSelectedItem() {
    return this.basicInformationLoader.selectedItem;
  }

  public dateChanged() {
    this.basicInformationLoader.selectedTime = moment(this.cinemaDate);
    this.basicInformationLoader.sendNext({changed: 'date'});
  }

  public getSelectedDate() {
    if (this.basicInformationLoader.selectedTime) {
      return this.basicInformationLoader.selectedTime.format('DD.MM.YYYY');
    }
  }

  public onCinemaClicked() {
    this.basicInformationLoader.sendNext({clicked: 'cinema'});
  }

  public onDateClicked() {
    this.basicInformationLoader.sendNext({clicked: 'date'});
  }
}
