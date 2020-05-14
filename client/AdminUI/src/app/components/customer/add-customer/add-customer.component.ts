import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, FormGroupDirective, Validators, FormGroup } from '@angular/forms';
import { MyErrorStateMatcher } from '../../../helper/ErrorStateMatcher';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { Contact, Customer } from 'src/app/models/customer.model';
import { Guid } from 'guid-typescript';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

   model:any;
   addContact:boolean = false;
   contactDataSource: any = [];
   displayedColumns: string[] = ['name', 'title', 'email', 'office_phone', 'mobile_phone'];
   contactError='';
   orgError='';
   contacts:Array<Contact> = [];

   matchCustomerName = new MyErrorStateMatcher();
   matchCustomerIdentifier = new MyErrorStateMatcher();
   matchAddress1 = new MyErrorStateMatcher();
   matchCity = new MyErrorStateMatcher();
   matchState = new MyErrorStateMatcher();
   matchZip = new MyErrorStateMatcher();
   
   matchFirstName = new MyErrorStateMatcher();
   matchLastName = new MyErrorStateMatcher();
   matchEmail = new MyErrorStateMatcher();
   
   customerFormGroup = new FormGroup({
    customerId: new FormControl({value: '', disabled: true}),
    customerName: new FormControl('', [Validators.required]),
    customerIdentifier: new FormControl('', [Validators.required]),
    address1: new FormControl('', [Validators.required]),
    address2: new FormControl(''),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required]),
   });

   contactFormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    title: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    office_phone: new FormControl(''),
    mobile_phone: new FormControl(''),
    contactNotes: new FormControl(''),
   });


  constructor( public subscriptionSvc: SubscriptionService, public customer_service: CustomerService) { 
    this.customerFormGroup.controls["customerId"].setValue(Guid.create());
  }

  createNew(){
    this.clearCustomer();
  }

  pushCustomer(){
    if(this.customerFormGroup.valid && this.contacts.length > 0)
    {
      var customer: Customer = {
        customer_uuid: this.customerFormGroup.controls["customerId"].value,
        name: this.customerFormGroup.controls["customerName"].value,
        identifier: this.customerFormGroup.controls["customerIdentifier"].value,
        address_1: this.customerFormGroup.controls["address1"].value,
        address_2: this.customerFormGroup.controls["address2"].value,
        city: this.customerFormGroup.controls["city"].value,
        state: this.customerFormGroup.controls["state"].value,
        zip_code: this.customerFormGroup.controls["zip"].value,
        contact_list: this.contacts
      }

      this.customer_service.addCustomer(customer).subscribe((data: any) => {
        this.clearCustomer()
      })
    } else if( !this.customerFormGroup.valid )
    {
      this.orgError = "Fix required fields";
    } else if( this.contacts.length < 1){
      this.orgError = "Please add at least one contact";
    }
  }

  pushContact(){
    if(this.contactFormGroup.valid)
    {
      var contact: Contact = {
        office_phone: this.contactFormGroup.controls['office_phone'].value,
        mobile_phone: this.contactFormGroup.controls['mobile_phone'].value,
        email: this.contactFormGroup.controls['email'].value,
        first_name: this.contactFormGroup.controls['firstName'].value,
        last_name: this.contactFormGroup.controls['lastName'].value,
        title: this.contactFormGroup.controls['title'].value,
        notes: this.contactFormGroup.controls['contactNotes'].value,
      };
      
      this.contacts.push(contact);
      this.clearContact();
    }
    else{
      this.contactError = "Fix required fields."
    }
  }

  clearCustomer(){

    this.customerFormGroup.reset();
    this.customerFormGroup.controls["customerId"].setValue(Guid.create());
    this.contacts = [];
    this.orgError = '';
  }

  clearContact(){
    this.contactFormGroup.reset();
    this.contactError = '';
    this.contactFormGroup.markAsUntouched();
  }

  showAddContact(){
    this.addContact = this.addContact ? false : true;
    if(!this.addContact)
    {
      this.clearContact();
    }
  }

  checkDataSourceLength(){
    return this.contacts.length > 0;
  }

  ngOnInit(): void {
    
  }
}