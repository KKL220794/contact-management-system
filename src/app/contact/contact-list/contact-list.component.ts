import { ServerService } from './../../server.service';
import { Router } from '@angular/router';
import { ContactModel } from './../../shared/contactModel.model';
import { ContactsService } from './../../contacts.service';
import { Component, OnInit, OnDestroy, OnChanges, DoCheck, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  // providers: [ServerService]
})
export class ContactListComponent implements OnInit, OnDestroy {

  contact: ContactModel[] ;
  filteredContact: ContactModel[];
  subscription: Subscription;
  searched: Boolean = false;

  constructor(private con_service: ContactsService, private router: Router ,
    private sservice: ServerService) {
      // this.sservice.getData();
  }



  ngOnInit() {
    this.subscription = this.con_service.contactUpdated.subscribe(
      (contact) => this.contact = this.filteredContact = contact
    );
    this.contact = this.con_service.getContacts();
    this.filteredContact = this.con_service.getContacts();
  }



  onShow(i: number) {
    this.router.navigate(['contact' , i]);

  }
  onFilter(f: string) {
    console.log(typeof(f));
    this.searched = (f != null || f !== '') ? true : false ;
    this.filteredContact = (f) ?
    this.contact.filter( p => (p.fname.toLowerCase().includes(f.toLowerCase())) ||
    (p.email.toLowerCase().includes(f.toLowerCase())) ||
    (p.phno.toString().includes(f))) : this.contact;


  }



  onSelected (i) {
    const email = this.filteredContact[i].email;
    const id = this.con_service.getContactByEmail(email);
    this.onShow(id);
  }
  getData () {
    this.sservice.getData();
  }

  saveData() {
    this.sservice.saveData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
