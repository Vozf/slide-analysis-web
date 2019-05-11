import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageListService } from '../image-list.service';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { first } from 'rxjs/internal/operators/first';

@Component({
    selector: 'app-image-list-recalculate-modal',
    templateUrl: './image-list-recalculate-modal.component.html',
    styleUrls: ['./image-list-recalculate-modal.component.scss'],
})
export class ImageListRecalculateModalComponent implements OnInit, OnDestroy {
    @Input() folderName: string;
    private destroyed$ = new Subject();
    private recalc$: Subject<boolean> = new Subject();

    constructor(public modal: NgbActiveModal, private imageListService: ImageListService) {
    }

    ngOnInit(): void {
        this.recalc$.pipe(
            first(),
            switchMap(() => this.imageListService.recalculate(this.folderName)),
            takeUntil(this.destroyed$),
        )
            .subscribe(threadName => this.modal.close(threadName));
    }

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    onOk() {
        this.recalc$.next();
    }
}
