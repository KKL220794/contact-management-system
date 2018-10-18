import { ServerService } from './server.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'contactApp';
  constructor(private sservice: ServerService) {}




  ngOnInit() {
    firebase.initializeApp(
      {
        apiKey: 'AIzaSyCW37jtrSril5ntno3WZAQacLYXB5ypR3w',
        authDomain: 'contactapp-34a85.firebaseapp.com',
        databaseURL: 'https://contactapp-34a85.firebaseio.com',
      }
    );
    this.sservice.getData();
  }

}
