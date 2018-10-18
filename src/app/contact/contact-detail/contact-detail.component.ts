import { ServerService } from './../../server.service';
import { ContactModel } from './../../shared/contactModel.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactsService } from 'src/app/contacts.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  id: number;
  employee: ContactModel;

  constructor(private router: Router , private route: ActivatedRoute,
    private empservice: ContactsService, private ss: ServerService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.id = +params['id'];
        this.employee = this.empservice.getContactById(this.id);
        // console.log("number is" +this.employee.phno);

      }
    );
  }

  onEdit() {
    this.router.navigate(['contact', this.id , 'edit']);
  }
  onDelete() {
    this.empservice.deleteContactById(this.id);
    this.ss.saveData();
    this.onCancel();
  }

onCancel() {
  this.router.navigate(['../'], {relativeTo: this.route});
}

}
