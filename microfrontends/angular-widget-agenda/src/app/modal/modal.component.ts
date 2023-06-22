import {Component, Input, Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserformModalService} from "../services/userformModalService";

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './modal.component.html',
})
export class ModalComponent {

    @Input() actionText = 'CANCEL'
    @Input() title = 'Welcome'

    @Output() okBtnPressedEvent = new EventEmitter<string>();

    @ViewChild('modal') modal!: ElementRef;


    constructor(private userFormModalService: UserformModalService) {

    }

    okBtnPressed() {
        this.okBtnPressedEvent.emit();
    }

    showModal(): void {
        this.modal.nativeElement.showModal();
    }
}
