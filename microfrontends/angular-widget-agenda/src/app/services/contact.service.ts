import {Injectable} from '@angular/core';
import {Contact} from "../model/contact";
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, throwError} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    private contactList = new BehaviorSubject(new Array<Contact>());
    private contactList$ = this.contactList.asObservable();
    private _apiBaseUrl = '';
    constructor(private httpClient: HttpClient) {}

    public set apiBaseUrl(value: string) {
        this._apiBaseUrl = value;
    }
    getContacts(): Observable<Contact[]>{
        return this.contactList$;
    }

    fetchAndSetContacts() {
        console.log('fetch contacts')
        const url = `${this._apiBaseUrl}/api/contacts`;
        this.httpClient.get<Contact[]>(url).subscribe((data: Contact[]) => this.contactList.next(data));
    }
    saveContact(id: any, name: string, lastname: string, address: string, phone: string): Observable<Contact> {
        let contact = {id, name, lastname, address, phone};

        if (id > -1) {
            const url = `${this._apiBaseUrl}/api/contacts/${id}`;
            return this.httpClient.put<Contact>(url, contact)
                .pipe(catchError(this.handleError));
        } else {
            const url = `${this._apiBaseUrl}/api/contact`;
            return this.httpClient.post<Contact>(url, contact)
                .pipe(catchError(this.handleError));
        }

    }
    deleteContact(id: number): Observable<any> {
        const url = `${this._apiBaseUrl}/api/contacts/${id}`;
        return this.httpClient.delete(url)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        console.error(`Error status code ${error.status}, body was: `, error.error);
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}
