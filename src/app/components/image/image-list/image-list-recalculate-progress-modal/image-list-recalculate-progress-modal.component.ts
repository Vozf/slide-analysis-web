import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageListService } from '../image-list.service';
import { ConnectableObservable, interval, Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil, takeWhile } from 'rxjs/operators';
import { multicast } from 'rxjs/internal/operators/multicast';

@Component({
    selector: 'app-image-list-recalculate-modal',
    templateUrl: './image-list-recalculate-progress-modal.component.html',
    styleUrls: ['./image-list-recalculate-progress-modal.component.scss'],
})
export class ImageListRecalculateProgressModalComponent implements OnInit, OnDestroy {
    @Input() threadName: string;
    public timer$ = interval(3000);
    public percentage$: ConnectableObservable<number>;
    public complete$: Observable<boolean>;
    public type$: Observable<string>;

    private destroyed$ = new Subject();


    constructor(public modal: NgbActiveModal, private imageListService: ImageListService) {
    }

    ngOnInit(): void {

        this.percentage$ = this.timer$.pipe(
            switchMap(() => this.imageListService.getProgress(this.threadName)),
            takeUntil(this.destroyed$),
            takeWhile(value => value < 100, true),
            multicast(() => new Subject<number>()),
        ) as ConnectableObservable<number>;
        this.percentage$.connect();

        this.complete$ = this.percentage$.pipe(map(value => value < 100));
        this.type$ = this.complete$.pipe(map(value => value ? 'info' : 'success'));

    }

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
