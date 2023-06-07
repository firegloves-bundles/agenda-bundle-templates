import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactService} from '../services/contact.service';
import {Contact} from "../model/contact";

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './table.component.html'
})
export class TableComponent {

    contactList: Contact[] = [];

    constructor(private contactService: ContactService) {
    }

    ngOnInit(): void {
        this.contactService.getAllContacts().subscribe((data: Contact[]) => this.contactList = data);
    }
}
