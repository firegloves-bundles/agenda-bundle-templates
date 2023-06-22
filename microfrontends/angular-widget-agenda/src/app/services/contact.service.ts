import {Injectable} from '@angular/core';
import {Contact} from "../model/contact";
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {BehaviorSubject, catchError, Observable, throwError} from "rxjs";
import {data} from "autoprefixer";

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    private contactList = new BehaviorSubject(new Array<Contact>());
    private contactList$ = this.contactList.asObservable();

    constructor(private httpClient: HttpClient) {
        this.fetchAndSetContacts();
    }

    getContacts(): Observable<Contact[]>{
        return this.contactList$;
    }

    fetchAndSetContacts() {
        const url = `${environment.domainUrl}/api/contacts`;
        this.httpClient.get<Contact[]>(url).subscribe((data: Contact[]) => this.contactList.next(data));
    }

    // getContactById(id: number): Contact | undefined {
        // return this.concactList.find(contact => contact.id === id);
    // }

    saveContact(id: any, name: string, lastname: string, address: string, phone: string): Observable<Contact> {
        let contact = {id, name, lastname, address, phone};

        if (id > -1) {
            const url = `${environment.domainUrl}/api/contacts/${id}`;
            return this.httpClient.put<Contact>(url, contact)
                .pipe(catchError(this.handleError));
        } else {
            const url = `${environment.domainUrl}/api/contact`;
            return this.httpClient.post<Contact>(url, contact)
                .pipe(catchError(this.handleError));
        }

    }

    deleteContact(id: number): Observable<any> {
        const url = `${environment.domainUrl}/api/contacts/${id}`;
        console.log(url);
        console.log("implement delete query");
        return this.httpClient.delete(url)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        console.error(`Error status code ${error.status}, body was: `, error.error);
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}
