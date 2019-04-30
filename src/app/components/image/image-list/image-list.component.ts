import { Component } from '@angular/core';
import { ImagePreviewService } from '../image-preview.service';
import { Filter, ImageFolder } from '../image.interface';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { mapTo, pluck } from 'rxjs/operators';
import { ImageListService } from './image-list.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageListRecalculateModalComponent } from './image-list-recalculate-modal/image-list-recalculate-modal.component';
import { fromPromise } from 'rxjs/internal-compatibility';

@Component({
    selector: 'app-image-list',
    templateUrl: './image-list.component.html',
    styleUrls: ['./image-list.component.scss'],
    providers: [ImagePreviewService, ImageListService],
})


export class ImageListComponent {
    filter$ = new BehaviorSubject(new Filter());
    images$ = this.filter$.pipe(
        pluck('search'),
        switchMap(this.imageService.getPreviews.bind(this.imageService)),
    );

    constructor(
        private imageService: ImagePreviewService,
        private imageListService: ImageListService,
        private modalService: NgbModal,
    ) {
    }

    updateSearch(search) {
        this.filter$.next({ ...this.filter$.getValue(), search });
    }

    recalculate(folder: ImageFolder) {
        fromPromise(this.modalService.open(ImageListRecalculateModalComponent, { size: 'lg' }).result).pipe(
            mapTo(folder.name),
            switchMap(this.imageListService.recalculate.bind(this.imageListService)),
        )
            .subscribe();
    }


}
