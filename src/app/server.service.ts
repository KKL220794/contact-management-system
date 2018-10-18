import { log } from 'util';
import { ContactsService } from 'src/app/contacts.service';
import { Http, Response } from '@angular/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactModel } from './shared/contactModel.model';



@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private contactservice: ContactsService, private http: Http) {
}

  getData() {
    this.http.get('https://contactapp-34a85.firebaseio.com/data.json').subscribe(
      (response: Response) => {
        const data: ContactModel[] = response.json() ;
        this.contactservice.updateFromServer(data);
        // return data;
        // response.json();

      }
    );
  }

  saveData() {
    // fs.writeFileSync(filename, JSON.stringify(content));
    this.http.put('https://contactapp-34a85.firebaseio.com/data.json',
    this.contactservice.getContacts()).subscribe(
    (response => console.log(response)));
  }
}
