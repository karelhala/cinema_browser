///<reference path="../../tsd.d.ts"/>

import ContactsController from './contactsController';

export default class ContactsComponent implements ng.IComponentOptions {
  public replace: boolean = true;
  public template = require<string>('./contacts.html');
  public controller = ContactsController;
  public controllerAs: string = 'vm';
  public bindings: any = {
  };
}
