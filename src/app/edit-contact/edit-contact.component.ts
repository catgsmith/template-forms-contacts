import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Contact } from '../contacts/contact.model';
import { ContactsService } from '../contacts/contacts.service';


@Component({
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  contact: Contact = {
    id: '',
    firstName: 'Fred',
    lastName: '',
    dateOfBirth: null,
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
  }

  constructor(private route: ActivatedRoute, private contactsService: ContactsService) { }

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

  saveContact() {
    console.log('Save contact', this.contact);
  }
}