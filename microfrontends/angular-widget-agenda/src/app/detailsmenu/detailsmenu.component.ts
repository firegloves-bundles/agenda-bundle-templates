import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Contact} from "../model/contact";
import {ContactService} from "../services/contact.service";
import {ModalComponent} from "../modal/modal.component";
// import {ModalComponent} from "../modal/modal.component";

@Component({
    selector: 'app-detailsmenu',
    standalone: true,
    imports: [CommonModule, ModalComponent],
    templateUrl: './detailsmenu.component.html',
    styleUrls: ['./detailsmenu.component.css']
})
export class DetailsmenuComponent {

    @ViewChild(ModalComponent) modalComponent!: ModalComponent;
    //@ViewChild('toggleCheckbox') toggleCheckbox!: ElementRef<HTMLInputElement>;

    @Input() contact!: Contact;

    isMenuVisible = false;
    isConfirmationVisible = false;

    constructor(private contactService: ContactService) {
    }

    toggleMenu(): void {
        this.isMenuVisible = !this.isMenuVisible;
    }

    editContact() {

    }

    toggleConfirmationModal() {
        this.modalComponent.showModal();
    }


    deleteContact() {
        if (this.contact) {
            this.contactService.deleteContact(this.contact.id);
        }
    }


}
