import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageListService, Progress } from '../image-list.service';
import { ConnectableObservable, interval, Observable, Subject } from 'rxjs';
import { catchError, map, switchMap, takeUntil, takeWhile } from 'rxjs/operators';
import { multicast } from 'rxjs/internal/operators/multicast';
import { tap } from 'rxjs/internal/operators/tap';
import { of } from 'rxjs/observable/of';

@Component({
    selector: 'app-image-list-recalculate-modal',
    templateUrl: './image-list-recalculate-progress-modal.component.html',
    styleUrls: ['./image-list-recalculate-progress-modal.component.scss'],
})
export class ImageListRecalculateProgressModalComponent implements OnInit, OnDestroy {
    @Input() threadName: string;
    public timer$ = interval(3000);
    public progress$: ConnectableObservable<Progress>;
    public complete$: Observable<boolean>;
    public type$: Observable<string>;

    private destroyed$ = new Subject();


    constructor(public modal: NgbActiveModal, private imageListService: ImageListService) {
    }

    ngOnInit(): void {

        this.progress$ = this.timer$.pipe(
            switchMap(() => this.imageListService.getProgress(this.threadName)),
            takeUntil(this.destroyed$),
            takeWhile(({ percent }) => percent < 100, true),
            multicast(() => new Subject<Progress>()),
        ) as ConnectableObservable<Progress>;
        this.progress$.connect();

        this.complete$ = this.progress$.pipe(map(({ percent }) => percent < 100));
        this.type$ = this.complete$.pipe(
            tap(val => console.log(val)),
            map(value => (value ? 'info' : 'success')),
            catchError(() => of('danger')),
        );

    }

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
