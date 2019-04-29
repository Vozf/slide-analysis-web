import { Component } from '@angular/core';
import { ImagePreviewService } from '../image-preview.service';
import { Filter, ImageFolder } from '../image.interface';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { pluck } from 'rxjs/operators';
import { ImageListService } from './image-list.service';

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

    constructor(private imageService: ImagePreviewService, private imageListService: ImageListService) {
    }

    updateSearch(search) {
        this.filter$.next({ ...this.filter$.getValue(), search });
    }

    recalculate(folder: ImageFolder) {
        this.imageListService.recalculate(folder.name).subscribe();
    }

}
