import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-image-list-recalculate-modal',
    templateUrl: './image-list-recalculate-modal.component.html',
    styleUrls: ['./image-list-recalculate-modal.component.scss'],
})
export class ImageListRecalculateModalComponent {
    constructor(public modal: NgbActiveModal) {}
}
