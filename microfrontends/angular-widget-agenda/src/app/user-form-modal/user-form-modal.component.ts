import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ContactService} from "../services/contact.service";
import {UserformModalService} from "../services/userformModalService";
import {Contact} from "../model/contact";

@Component({
  selector: 'app-user-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form-modal.component.html',
})
export class UserFormModalComponent {

  @Input() buttonText = 'Open Modal'
  @Input() actionText = 'CANCEL'
  @Input() title = 'Welcome'
  @Input() contact!: Contact;

  @Output() okBtnPressedEvent = new EventEmitter<string>();

  @ViewChild('userFormModal') modal!: ElementRef;

  contactForm!: FormGroup;

  constructor(private contactService: ContactService) {
              // private userFormModalService: UserformModalService) {

  }

  ngOnInit() {
    // this.userFormModalService.getShowModal().subscribe(this.handleShowModal);
    this.contactForm = new FormGroup({
      name: new FormControl(this.contact && this.contact.name || ''),
      lastname: new FormControl(this.contact && this.contact.lastname || ''),
      address: new FormControl(this.contact && this.contact.address || ''),
      phone: new FormControl(this.contact && this.contact.phone || '')
    });
  }

  // handleShowModal(value: boolean) {
  //   if (value) {
  //     this.contact = this.userFormModalService.getContact();
  //     this.contactForm.controls.name.setValue(this.contact && this.contact.name || '');
  //     this.showModal();
  //   }
  // }

  saveContact() {
    console.log('daje')
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
    this.saveContact();
  }

  showModal(): void {
      this.modal.nativeElement.showModal();
  }
}
