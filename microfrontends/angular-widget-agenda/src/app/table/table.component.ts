import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactService} from '../services/contact.service';
import {Contact} from "../model/contact";
import {DetailsmenuComponent} from "../detailsmenu/detailsmenu.component";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [CommonModule, DetailsmenuComponent],
    templateUrl: './table.component.html'
})
export class TableComponent {

    private subscription: Subscription | undefined;
    contactList: Contact[] = [];

    constructor(private contactService: ContactService) {
    }

    ngOnInit(): void {
        this.subscription = this.contactService.getContacts().subscribe((data: Contact[]) => {
            this.contactList = data.sort((a, b) => b.id - a.id);
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
