// import { log } from 'util';
import { ServerService } from './server.service';
import { ContactModel } from './shared/contactModel.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
// import { Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contactUpdated = new Subject<ContactModel[]>();
  private employee: ContactModel[] = [];

  constructor( ) {
  }

  // private employee: ContactModel[] = [];
  getContacts() {
    console.log(this.employee.length);
    return this.employee;
  }

  getContactById(id: number) {
    return this.employee[id];
  }

  getContactByEmail(Email: string) {
    for ( const em of this.employee) {
      if (em.email === Email) {
        return this.employee.indexOf(em);
      }
    }
  }

  updateContactById(id: number, emp: ContactModel) {
    this.employee[id] = emp;
    this.contactUpdated.next(this.employee);
  }
  updateFromServer(data: ContactModel[]) {
    // console.log(data);
    // console.log(typeof(data));
    // console.log(this.employee.length);
    this.employee = data;
    // console.log(this.employee);
    this.contactUpdated.next(this.employee.slice());
    // console.log('employe' + this.employee[0].fname);
  }

  deleteContactById(id: number) {
    this.employee.splice(id, 1);
    this.contactUpdated.next(this.employee.slice());
  }
}
