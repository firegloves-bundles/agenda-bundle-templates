import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {ContactService} from "../services/contact.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent {

  @Input() buttonText = 'Open Modal'
  @Input() actionText = 'Yay!'
  @Input() title = 'Welcome'

  constructor(private contactService: ContactService) { }

  contactForm = new FormGroup({
    name: new FormControl(''),
    lastname: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl('')
  });

  saveContact() {
    this.contactService.saveContact(
        this.contactForm.value.name ?? '',
        this.contactForm.value.lastname ?? '',
        this.contactForm.value.address ?? '',
        this.contactForm.value.phone ?? ''
    );
  }
}
