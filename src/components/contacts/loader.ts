///<reference path="../../tsd.d.ts"/>
import ContactsComponent from './contactsComponent';

export default (module: ng.IModule) => {
  module.component('contacts', new ContactsComponent);
}
