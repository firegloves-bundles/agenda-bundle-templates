import {Injectable} from '@angular/core';
import {Contact} from "../model/contact";
import {HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    constructor(private httpClient: HttpClient) {
    }

    private concactList: Array<Contact> = [
        new Contact(1, "luca", "Cors", "via bella", "328"),
        new Contact(2, "mario", "sangri", "via brutta", "1"),
        new Contact(3, "ezio", "auditore", "via del ponte", "666"),
    ];


    getAllContacts(): Observable<Contact[]> {
        const url = `${environment.domainUrl}/api/contacts`;
        return this.httpClient.get<Contact[]>(url);
    }

    getContactById(id: number): Contact | undefined {
        return this.concactList.find(contact => contact.id === id);
    }

    saveContact(name: string, lastName: string, address: string, phoneNumber: string) {
        // console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
    }
}
