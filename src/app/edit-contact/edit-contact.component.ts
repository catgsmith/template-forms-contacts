import {CommonModule, NgOptimizedImage} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Contact } from '../contacts/contact.model';
import { ContactsService } from '../contacts/contacts.service';
import { phoneTypeValues} from "../contacts/contact.model";
import { addressTypeValues } from '../contacts/contact.model';


@Component({
  imports: [CommonModule, FormsModule, NgOptimizedImage,],
  standalone: true,
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  phoneTypes = phoneTypeValues;
  addressTypes = addressTypeValues;

  contact: Contact = {
    id: '',
    personal: false,
    firstName: 'Fred',
    lastName: '',
    dateOfBirth: '',
    favoritesRanking: 0,
    phone: {
      phoneNumber: '',
      phoneType: '',
    },
    address: {
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      addressType: '',
    },
    notes: ''
  }

  constructor(private route: ActivatedRoute, private contactsService: ContactsService,
    private router: Router
  ) { }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    console.log('Contact ID', contactId);
    if (!contactId) return;
    this.contactsService.getContact(contactId).subscribe(contact => {
      if (contact) {
        this.contact = contact;
      }
    });
  }

  saveContact(form: NgForm) {
    //console.log('Form', form.value);
    //console.log(this.contact.personal, typeof this.contact.personal);
    //console.log(this.contact.favoritesRanking, typeof this.contact.favoritesRanking);
    console.log(this.contact.dateOfBirth, typeof this.contact.dateOfBirth);
    this.contactsService.saveContact(form.value).subscribe(
      () => this.router.navigate(['/contacts'])
    );
  }
}
