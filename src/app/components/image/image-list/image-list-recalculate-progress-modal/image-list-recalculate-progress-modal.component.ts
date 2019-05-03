import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageListService, Progress } from '../image-list.service';
import { ConnectableObservable, interval, Observable, Subject } from 'rxjs';
import { catchError, map, switchMap, takeUntil, takeWhile, startWith, multicast } from 'rxjs/operators';
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
            startWith(0),
            switchMap(() => this.imageListService.getProgress(this.threadName)),
            takeUntil(this.destroyed$),
            takeWhile(({ isAlive }) => isAlive, true),
            multicast(() => new Subject<Progress>()),
        ) as ConnectableObservable<Progress>;
        this.progress$.connect();

        this.complete$ = this.progress$.pipe(map(({ isAlive }) => isAlive));
        this.type$ = this.complete$.pipe(
            map(value => (value ? 'info' : 'success')),
            catchError(() => of('danger')),
        );

    }

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
