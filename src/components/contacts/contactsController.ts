///<reference path="../../tsd.d.ts"/>

export default class ContactsController {
  private contactsData: any;
  /* @ngInject */
  constructor(private contactLoader: any, private $window: any) {
    let contacts = this.contactLoader.getContactData();
    if (contacts.hasOwnProperty('$$state')) {
      contacts.then((contactsData) => {
        this.contactsData = contactsData;
      });
    }
  }

  public contactClicked(contact) {
    if (contact.hasOwnProperty('link')) {
      this.$window.location.href = contact.link;
    }
  }
}
