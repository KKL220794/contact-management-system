import { ServerService } from './server.service';
import { ContactsService } from './contacts.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactDetailComponent } from './contact/contact-detail/contact-detail.component';
import { ContactEditComponent } from './contact/contact-edit/contact-edit.component';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './contact/start/start.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BsDatepickerModule} from 'ngx-bootstrap';

const routes: Routes = [
  {path: '' , redirectTo: '/contact' , pathMatch: 'full' },
  {path: 'contact' , component: ContactComponent, children: [
    { path: '', component: StartComponent},
    { path: ':id', component: ContactDetailComponent},
    { path: ':id/edit', component: ContactEditComponent},
  ]}
];

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactEditComponent,
    StartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [ContactsService, ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
