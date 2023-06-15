export class Contact {
    id: number;
    name: string;
    lastname: string;
    address: string;
    phone: string;

    constructor(id: number, name: string, lastname: string, address: string, phone: string) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.address = address;
        this.phone = phone;
    }
}
