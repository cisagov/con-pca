import { Component, OnInit, Inject } from '@angular/core';
import { LayoutMainService } from 'src/app/services/layout-main.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {CustomerService} from 'src/app/services/customer.service'
import { Customer, ICustomerContact } from 'src/app/models/customer.model';

// Interface for Contact Info
export interface ContactsInfo {
  customer: string;
  first_name: string;
  last_name: string;
  title: string;
  primary_contact: string;
  phone: string;
  email: string;
  notes: string;
}


// Example contacts data
const contactsData: ContactsInfo[] = [
  { customer: "Idaho National Labs", first_name: "Barry", last_name: "Hansen", title: "CEO", primary_contact: "Yes", phone: "(123)456-2000", email: "Barry.Hansen@inl.gov", notes: "The boss. Definitely a cool guy."},
  { customer: "Idaho National Labs", first_name: "Randy", last_name: "Woods", title: "Developer", primary_contact: "No", phone: "(123)456-2000", email: "Randy.Woods@inl.gov", notes: ""},
  { customer: "Idaho National Labs", first_name: "Jason", last_name: "Kuipers", title: "Developer", primary_contact: "No", phone: "(123)456-2000", email: "Jason.Kuipers@inl.gov", notes: ""},
  { customer: "Idaho National Labs", first_name: "McKenzie", last_name: "Willmore", title: "Team Manager", primary_contact: "Yes", phone: "(123)456-2000", email: "McKenzie.Willmore@inl.gov", notes: ""},
  { customer: "Neetflix Streaming Services", first_name: "Bob", last_name: "Smith", title: "CEO", primary_contact: "Yes", phone: "(123)456-2001", email: "Bob.Smith@neetflix.com", notes: ""},
  { customer: "Neetflix Streaming Services", first_name: "Sarah", last_name: "Smith", title: "CFO", primary_contact: "No", phone: "(123)456-2001", email: "Jake.Smith@neetflix.com", notes: ""},
  { customer: "Neetflix Streaming Services", first_name: "Sam", last_name: "Smith", title: "CTO", primary_contact: "No", phone: "(123)456-2001", email: "Sam.Smith@neetflix.com", notes: ""},
  { customer: "Some Other Company", first_name: "Ashley", last_name: "Tolley", title: "HR Manager", primary_contact: "Yes", phone: "(123)456-2002", email: "Ashley.Tolley@SOC.com", notes: ""},
  { customer: "Some Other Company", first_name: "April", last_name: "Gates", title: "Snarky Assistant", primary_contact: "No", phone: "(123)456-2002", email: "April.Gates@SOC.com", notes: ""},
  { customer: "Some Other Company", first_name: "Jake", last_name: "Eshleman", title: "IT & Security", primary_contact: "No", phone: "(123)456-2002", email: "Jake.Eshleman", notes: ""},
  { customer: "Some Other Company", first_name: "Cynthia", last_name: "Johnson", title: "IT & Security", primary_contact: "No", phone: "(123)456-2002", email: "Cynthia.Johnson", notes: ""}
];

// =======================================
// MAIN CONTACTS PAGE
// =======================================
@Component({
  selector: '',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  body_content_height: number;
  dataSource = new MatTableDataSource(contactsData)

  displayedColumns = [
    "customer",
    "first_name",
    "last_name",
    "title",
    "primary_contact",
    "select"
  ];

  constructor(
    private layoutSvc: LayoutMainService, 
    public dialog: MatDialog,
    public customerService: CustomerService) {
    layoutSvc.setTitle('Con-PCA Contacts Page');
  }


  // Filters search on key up in search bar
  searchFilter(searchValue: string): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Opens a dialog box for adding a contact
  openAddDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {}
    const dialogRef = this.dialog.open(AddContactDialog, dialogConfig);

    dialogRef.afterClosed().subscribe(value => {
      this.refresh()
    })
  }

  // Opens a dialog box for viewing, editing and deleting a contact
  openViewDialog(row: ContactsInfo): void {
    const dialogRef = this.dialog.open(
      ViewContactDialog, {
        data: row
      }
    );
    dialogRef.afterClosed().subscribe(value => {
      this.refresh()
    })
  }

  // Refreshes the data source view
  refresh(): void {
    this.dataSource.data = this.dataSource.data;
  }

  ngOnInit() {
    let customers: Customer[] = this.customerService.getCustomers();
    console.log(customers);
    let customerContactList: ICustomerContact[] = this.customerService.getCustomerContactList(customers);

    // New predicate for filtering.
    // The default predicate will only compare words against a single column.
    // Ex. if you search "Barry Hansen" no results would return because there are two columns...
    // One for first_name and one for last name.
    // This new predicate will search each word against all columns, if a word doesn't match anywhere...
    // no results will be returned.
    this.dataSource.filterPredicate = (data: ContactsInfo, filter: string) => {
      var words = filter.split(' ');

      // Create search data once so it's not created each time in loop
      let searchData = `${data.first_name.toLowerCase()} ${data.last_name.toLowerCase()} ${data.customer.toLowerCase()} ${data.title.toLowerCase()}`

      for (var i = 0; i < words.length; i++) {

        // Don't want to compare bad input
        if (words[i] == null || words[i] == '' || words[i] == ' ') {
          continue;
        }

        // Check if search data contains the word
        var isMatch = searchData.indexOf(words[i].trim().toLowerCase()) > -1;
        
        // If there's no match for the word, return false
        if (!isMatch) {
          return false;
        }
      }
      
      // return true if false was never returned
      return true;
    };
  }
}

// =======================================
// ADD CONTACT DIALOG
// =======================================
@Component({
  selector: 'add-contact-dialog',
  templateUrl: 'dialogues/add-contact-dialog.html',
  styleUrls: ['./contacts.component.scss'],
})
export class AddContactDialog {
  data: ContactsInfo;
  isPrimary = false;
  addContactCustomer: string;
  addContactFirstName: string;
  addContactLastName: string;
  addContactTitle: string;
  addContactPrimary: string;
  addContactPhone: string;
  addContactEmail: string;
  addContactNotes: string;


  constructor(
    public dialogRef: MatDialogRef<AddContactDialog>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.isPrimary == true) {
        this.addContactPrimary = "Yes"
    } else {
      this.addContactPrimary = "No"
    }

    contactsData.push({
      customer: this.addContactCustomer, 
      first_name: this.addContactFirstName,
      last_name: this.addContactLastName, 
      title: this.addContactTitle, 
      primary_contact: this.addContactPrimary,
      phone: this.addContactPhone,
      email: this.addContactEmail, 
      notes: this.addContactNotes
    });
    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}


// =======================================
// VIEW CONTACT DIALOG
// =======================================
@Component({
  selector: 'view-contact-dialog',
  templateUrl: 'dialogues/view-contact-dialog.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ViewContactDialog {
  data: ContactsInfo;
  edit: boolean = false;

  contactFormGroup = new FormGroup({
    customer: new FormControl(),
    first_name: new FormControl(),
    last_name: new FormControl(),
    title: new FormControl(),
    primary_contact: new FormControl(),
    phone: new FormControl(),
    email: new FormControl(),
    notes: new FormControl(),
  })

  initialData: ContactsInfo;

  constructor(
    public dialogRef: MatDialogRef<ViewContactDialog>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.data = data;
      this.initialData = Object.assign({}, data);
      this.contactFormGroup.disable();
    }

  onEditClick(): void {
    this.edit = true;
    this.contactFormGroup.enable();
  }

  onSaveEditClick(): void {
    this.edit = false;
    this.contactFormGroup.disable();
  }

  onCancelEditClick(): void {
    this.contactFormGroup.patchValue(this.initialData);
    console.log(this.data);
  }

  onDeleteClick(): void {
    const index = contactsData.indexOf(this.data, 0);
    console.log(index)
    if (index > -1) {
      contactsData.splice(index, 1);
    }
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get diagnostic() {return JSON.stringify(this.data)}
}