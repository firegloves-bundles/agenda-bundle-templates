import {CommonModule} from '@angular/common';
import {Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {TableComponent} from "./table/table.component";
import {ModalComponent} from "./modal/modal.component";
import {ContainerComponent} from './container/container.component';
import {KeycloakService} from './services/keycloak.service';
import {UserFormModalComponent} from "./user-form-modal/user-form-modal.component";
import {mfeconfig} from 'src/environments/environment';
import {ContactService} from "./services/contact.service";

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

    @Input() config: any;
    @ViewChild(UserFormModalComponent) userFormModalComponent!: UserFormModalComponent;

    title = 'angular-widget-agenda';
    keycloak: any;

    constructor(private keycloakService: KeycloakService,
                private contactService: ContactService) {
    }

    ngOnInit() {
        this.keycloakService.instance$.subscribe(kcInstance => this.keycloak = kcInstance);
        this.setConfig();
        this.contactService.apiBaseUrl = this.config.systemParams.api["springboot-agenda-api"].url;
        this.contactService.fetchAndSetContacts();
    }

    private setConfig() {
        if (this.config) {
            this.config = JSON.parse(this.config);
        } else {
            this.config = mfeconfig
        }
    }

    showUserFormModal() {
        this.userFormModalComponent.showModal();
    }
}
