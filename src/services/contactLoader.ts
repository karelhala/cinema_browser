///<reference path="../tsd.d.ts"/>

export default class ContactLoader {
  private contactData: any = [];

  /* @ngInject */
  constructor(private $http: ng.IHttpService) {
  }

  public getContactData(): any {
    if (this.contactData.length > 0) {
      return this.contactData;
    } else {
      return this.loadContactData();
    }
  }

  private loadContactData(): ng.IPromise<any> {
    return this.$http.get('/data/contact.json').then((responseData) => {
      return responseData.data;
    });
  }
}
