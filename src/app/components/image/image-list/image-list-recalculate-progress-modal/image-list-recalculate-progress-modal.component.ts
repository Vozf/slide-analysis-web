import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageListService } from '../image-list.service';
import { interval, Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil, takeWhile } from 'rxjs/operators';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
    selector: 'app-image-list-recalculate-modal',
    templateUrl: './image-list-recalculate-progress-modal.component.html',
    styleUrls: ['./image-list-recalculate-progress-modal.component.scss'],
})
export class ImageListRecalculateProgressModalComponent implements OnInit, OnDestroy {
    @Input() threadName: string;
    public timer$ = interval(3000);
    public percentage$: Observable<number>;
    public complete$: Observable<boolean>;
    public type$: Observable<string>;

    private destroyed$ = new Subject();


    constructor(public modal: NgbActiveModal, private imageListService: ImageListService) {
    }

    ngOnInit(): void {

        this.percentage$ = this.timer$.pipe(
            tap(val => console.log(val, 'aha')),
            switchMap(() => this.imageListService.getProgress(this.threadName)),
            takeUntil(this.destroyed$),
            takeWhile(value => value < 100, true),
        );

        this.complete$ = this.percentage$.pipe(map(value => value < 100));
        this.type$ = this.complete$.pipe(map(value => value ? 'info' : 'success'));

    }

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
