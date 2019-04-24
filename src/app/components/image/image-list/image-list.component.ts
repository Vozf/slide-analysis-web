import { Component } from '@angular/core';
import { ImagePreviewService } from '../image-preview.service';
import { Filter } from '../image.interface';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { pluck } from 'rxjs/operators';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
    selector: 'app-image-list',
    templateUrl: './image-list.component.html',
    styleUrls: ['./image-list.component.scss'],
    providers: [ImagePreviewService],
})


export class ImageListComponent {
    filter$ = new BehaviorSubject(new Filter());
    images$ = this.filter$.pipe(
        pluck('search'),
        switchMap(this.imageService.getPreviews.bind(this.imageService)),
        tap(console.log.bind(console)),
    );
    encode = encodeURIComponent;

    constructor(private imageService: ImagePreviewService) {
    }

    updateSearch(search) {
        this.filter$.next({ ...this.filter$.getValue(), search });
    }

}
