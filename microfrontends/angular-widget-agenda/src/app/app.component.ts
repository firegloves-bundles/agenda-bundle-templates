import {CommonModule} from '@angular/common';
import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {TableComponent} from "./table/table.component";
import {ModalComponent} from "./modal/modal.component";
import {ContainerComponent} from './container/container.component';
import {KeycloakService} from './services/keycloak.service';
import {Contact} from "./model/contact";
import {ContactService} from "./services/contact.service";
import {UserFormModalComponent} from "./user-form-modal/user-form-modal.component";

@Component({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    selector: 'angular-widget-agenda',
    standalone: true,
    encapsulation: ViewEncapsulation.ShadowDom,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, TableComponent, ModalComponent, UserFormModalComponent, ContainerComponent]
})
export class AppComponent implements OnInit {
    @ViewChild(UserFormModalComponent) userFormModalComponent!: UserFormModalComponent;

    title = 'angular-widget-agenda';
    keycloak: any;


    constructor(private keycloakService: KeycloakService) {//}, private contactService: ContactService) {
    }

    ngOnInit() {
        this.keycloakService.instance$.subscribe(kcInstance => this.keycloak = kcInstance);
        // this.contactService.getContacts().subscribe((data: Contact[]) => this.contactList = data);
    }

    showUserFormModal() {
        this.userFormModalComponent.showModal();
    }
}
