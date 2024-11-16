import {CommonModule, NgOptimizedImage} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Contact, addressTypeValues, phoneTypeValues } from '../contacts/contact.model';
import { ContactsService } from '../contacts/contacts.service';
import { RestrictedWordsValidator} from "../validators/restricted-words-validator.directive";
import { DateValueAccessorDirective } from '../date-value-accessor/date-value-accessor.directive';
import { ProfileIconSelectorComponent } from '../profile-icon-selector/profile-icon-selector.component';


@Component({
  imports: [CommonModule, FormsModule, NgOptimizedImage, RestrictedWordsValidator, DateValueAccessorDirective, ProfileIconSelectorComponent],
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
