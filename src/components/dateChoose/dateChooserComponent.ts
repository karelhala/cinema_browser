import * as moment from 'moment';

export class DateChooserController {
  public allDates: any[] = [];
  /* @ngInject */
  constructor(private basicInformationLoader: any) {
    moment.locale('cs');
    for (let i = 0; i < 5; i++) {
      let momentDate = moment().add(i, 'day').startOf('day');
      this.allDates.push({title: momentDate.format('ddd'), date: momentDate.toDate(), momentDate: momentDate});
    }
    this.onDateChange();
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
    if (data.changed === 'date') {
      this.onDateChange();
    }
  }

  private onDateChange() {
    let oldSelected = _.find(this.allDates, {isSelected: true});
    if (oldSelected) {
      oldSelected.isSelected = false;
    }
    let selectedDate: any = _.find(this.allDates, {date: this.basicInformationLoader.selectedTime.toDate()});
    if (selectedDate) {
      selectedDate.isSelected = true;
    }
  }

  public onDateClicked(item) {
    this.basicInformationLoader.selectedTime = item.momentDate;
    this.basicInformationLoader.sendNext({changed: 'date'});
  }

  private onFailAndClose() {
    console.log('Fail or close subject');
  }
}

export default class DateChooserComponent implements ng.IComponentOptions {
  public replace: boolean = true;
  public template = require<string>('./date-chooser.html');
  public controller = DateChooserController;
  public controllerAs: string = 'vm';
  public bindings: any = {
  };
}
