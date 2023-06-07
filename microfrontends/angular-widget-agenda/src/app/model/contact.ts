export class Contact {
    id: number;
    name: string;
    lastName: string;
    address: string;
    phoneNumber: string;

    constructor(id: number, name: string, lastName: string, address: string, phoneNumber: string) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
}
