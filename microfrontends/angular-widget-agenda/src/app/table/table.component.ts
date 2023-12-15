import {Component, TrackByFunction} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactService} from '../services/contact.service';
import {Contact} from "../model/contact";
import {DetailsmenuComponent} from "../detailsmenu/detailsmenu.component";
import {Observable} from "rxjs";

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [CommonModule, DetailsmenuComponent],
    templateUrl: './table.component.html',
})
export class TableComponent {

    // private subscription: Subscription | undefined;
    contactList$: Observable<Contact[]>;

    constructor(private contactService: ContactService) {
        this.contactList$ = this.contactService.getContacts();
    }

    trackById: TrackByFunction<Contact> = (index: number, contact: Contact) => index;

}
