///<reference path="../../tsd.d.ts"/>

export default class TimelineEntryController {
  public isLeft: boolean;
  public personObject: any;
  public entry: any;

  /* @ngInject */
  public constructor(private $window: any) {}

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
}
