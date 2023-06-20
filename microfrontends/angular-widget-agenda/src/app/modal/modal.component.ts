import {Component, Input, Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './modal.component.html',
})
export class ModalComponent {

    @Input() buttonText = 'Open Modal'
    @Input() actionText = 'Yay!'
    @Input() title = 'Welcome'

    @Output() okBtnPressedEvent = new EventEmitter<string>();

    @ViewChild('myModal') myModal!: ElementRef;

    okBtnPressed() {
        this.okBtnPressedEvent.emit();
    }

    showModal(): void {
        this.myModal.nativeElement.showModal();
    }
}
