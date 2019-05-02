import { Component, OnInit } from '@angular/core';
import { Filter, ImageFolder, ImageListItems } from '../image.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageListRecalculateModalComponent } from './image-list-recalculate-modal/image-list-recalculate-modal.component';
import { ImageListStoreActions, ImageListStoreSelectors, RootStoreState } from '../../../root-store';
import { Store } from '@ngrx/store';
import { fromPromise } from 'rxjs/internal-compatibility';
import { switchMap } from 'rxjs/operators';
import { ImageListRecalculateProgressModalComponent } from './image-list-recalculate-progress-modal/image-list-recalculate-progress-modal.component';

@Component({
    selector: 'app-image-list',
    templateUrl: './image-list.component.html',
    styleUrls: ['./image-list.component.scss'],
    providers: [],
})


export class ImageListComponent implements OnInit {
    filter$ = new BehaviorSubject(new Filter());
    images$: Observable<ImageListItems>;

    constructor(
        private modalService: NgbModal,
        private store$: Store<RootStoreState.State>,
    ) {
    }

    ngOnInit(): void {
        this.images$ = this.store$.select(ImageListStoreSelectors.selectImages);

        this.filter$.subscribe(filter => this.store$.dispatch(new ImageListStoreActions.FilterUpdate(filter)));
    }

    updateSearch(search) {
        this.filter$.next({ ...this.filter$.getValue(), search });
    }

    recalculate(folder: ImageFolder) {
        const modalRef = this.modalService.open(ImageListRecalculateModalComponent, { size: 'lg' });
        modalRef.componentInstance.folderName = folder.name;

        fromPromise(modalRef.result).subscribe(threadName => {
            const progressModalRef = this.modalService.open(ImageListRecalculateProgressModalComponent,
                { size: 'lg' });
            progressModalRef.componentInstance.threadName = threadName;
        });

    }


}
