import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';

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

    showModal = false;

    okBtnPressed() {
        this.toggleModal();
        this.okBtnPressedEvent.emit();
    }

    toggleModal() {
        this.showModal = !this.showModal;
    }
}
