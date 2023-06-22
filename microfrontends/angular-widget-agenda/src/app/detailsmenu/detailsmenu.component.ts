import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Contact} from "../model/contact";
import {ContactService} from "../services/contact.service";
import {ModalComponent} from "../modal/modal.component";
import {UserformModalService} from "../services/userformModalService";
import {UserFormModalComponent} from "../user-form-modal/user-form-modal.component";
// import {ModalComponent} from "../modal/modal.component";

@Component({
    selector: 'app-detailsmenu',
    standalone: true,
    imports: [CommonModule, ModalComponent, UserFormModalComponent],
    templateUrl: './detailsmenu.component.html',
    styleUrls: ['./detailsmenu.component.css']
})
export class DetailsmenuComponent {

    @ViewChild(ModalComponent) modalComponent!: ModalComponent;
    @ViewChild(UserFormModalComponent) userFormModalComponent!: UserFormModalComponent;
    //@ViewChild('toggleCheckbox') toggleCheckbox!: ElementRef<HTMLInputElement>;

    @Input() contact!: Contact;

    isMenuVisible = false;
    isConfirmationVisible = false;

    constructor(private contactService: ContactService,
                private userFormModalService: UserformModalService) {
    }

    toggleMenu(): void {
        this.isMenuVisible = !this.isMenuVisible;
    }

    editContact() {
        this.toggleMenu();
        this.userFormModalComponent.showModal();
    }

    toggleConfirmationModal() {
        this.toggleMenu();
        this.modalComponent.showModal();
    }

    deleteContact() {
        if (this.contact) {
            this.contactService.deleteContact(this.contact.id);
        }
    }


}
