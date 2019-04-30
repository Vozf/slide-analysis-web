import { Component, OnInit } from '@angular/core';
import { ImagePreviewService } from '../image-preview.service';
import { Filter, ImageFolder, ImageListItems } from '../image.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { ImageListService } from './image-list.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageListRecalculateModalComponent } from './image-list-recalculate-modal/image-list-recalculate-modal.component';
import { fromPromise } from 'rxjs/internal-compatibility';
import { ImageListStoreActions, ImageListStoreSelectors, RootStoreState } from '../../../root-store';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-image-list',
    templateUrl: './image-list.component.html',
    styleUrls: ['./image-list.component.scss'],
    providers: [ImagePreviewService, ImageListService],
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
        fromPromise(this.modalService.open(ImageListRecalculateModalComponent, { size: 'lg' }).result).subscribe(
            () => this.store$.dispatch( new ImageListStoreActions.Recalculate(folder),
        ));
    }


}
