import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ContactService} from "../services/contact.service";
import {Contact} from "../model/contact";

@Component({
  selector: 'app-user-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form-modal.component.html',
})
export class UserFormModalComponent {

  @Input() showBtn = false
  @Input() buttonText = 'Open Modal'
  @Input() actionText = 'CANCEL'
  @Input() title = 'Welcome'
  @Input() contact!: Contact;

  @Output() okBtnPressedEvent = new EventEmitter<string>();

  showModal = false;
  contactForm!: FormGroup;

  constructor(private contactService: ContactService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initFormFields();
  }

  initFormFields() {
    this.contactForm = this.formBuilder.group({
      name: [this.contact && this.contact.name || '', Validators.required],
      lastname: [this.contact && this.contact.lastname || '', Validators.required],
      address: [this.contact && this.contact.address || '', Validators.required],
      phone: [this.contact && this.contact.phone || '', Validators.required],
    });
  }

  saveContact() {
    this.contactService.saveContact(
        this.contact && this.contact.id || undefined,
        this.contactForm.value.name ?? '',
        this.contactForm.value.lastname ?? '',
        this.contactForm.value.address ?? '',
        this.contactForm.value.phone ?? ''
    ).subscribe(c => {
      this.contactService.fetchAndSetContacts();
    });
  }

  okBtnPressed() {
    this.toggleModal();
    this.saveContact();
  }

  cancelBtnPressed() {
    this.toggleModal();
    this.initFormFields();
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

}
