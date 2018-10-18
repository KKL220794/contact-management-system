import { log } from 'util';
import { ServerService } from 'src/app/server.service';
import { ContactModel } from './../../shared/contactModel.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactsService } from 'src/app/contacts.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  index: number;
  contactForm: FormGroup;
  datePickerConfig: Partial<BsDatepickerConfig>;
  state: Boolean = true;
  emp: ContactModel;

  constructor(private route: ActivatedRoute , private contactservice: ContactsService,
    private router: Router, private sservice: ServerService) {
    this.route.params.subscribe(
      (param) => {
        this.index = +param['id'];
        this.forminit();
      }
    );
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-blue',
        dateInputFormat: 'MM/DD/YYYY',
      });
   }

  ngOnInit() {
  }

  private forminit() {

    this.emp = this.contactservice.getContactById(this.index);
    console.log(typeof(this.emp.phno));
    this.contactForm = new FormGroup({
      'fname' : new FormControl(this.emp.fname, [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]),
      'lname' : new FormControl(this.emp.lname, [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]),
      'gender' : new FormControl(this.emp.gender, Validators.required),
      'DOB' : new FormControl(this.emp.DOB, Validators.required),
      'phno' : new FormControl(this.emp.phno, [Validators.required, Validators.
        pattern(/^[1-9][0-9]{2}-[0-9]{3}-[0-9]{4}$/)]),
      'email' : new FormControl(this.emp.email, Validators.required),
    });

  }

  onSubmit() {
    this.emp.fname = this.contactForm.value['fname'];
    this.emp.lname = this.contactForm.value['lname'];
    this.emp.gender = this.contactForm.value['gender'];
    this.emp.DOB = this.contactForm.value['DOB'];
    this.emp.phno = this.contactForm.value['phno'];
    // console.log(this.emp);
    this.contactservice.updateContactById(this.index , this.emp);
    this.state = false;
    this.sservice.saveData();
    alert('Hoorah!!! Update Successful');
    this.onCancel();
    // this.sservice.getData();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo : this.route});
  }

  onMain() {
    this.router.navigate(['/']);
    // this.sservice.getData();
  }

}
