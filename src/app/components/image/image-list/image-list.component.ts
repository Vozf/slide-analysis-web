import { Component, OnInit } from '@angular/core';
import { ImagePreviewService } from '../image-preview.service';
import { Image } from '../image.interface';

@Component({
    selector: 'app-image-list',
    templateUrl: './image-list.component.html',
    styleUrls: ['./image-list.component.scss'],
    providers: [ImagePreviewService],
})
export class ImageListComponent implements OnInit {
    images: Image[] = [];
    encode = encodeURIComponent;
    filtro = '';

    constructor(private imageService: ImagePreviewService) {
    }

    ngOnInit() {
        this.getImages();
    }

    getImages(): void {
        this.imageService.getPreviews()
            .subscribe(images => {
                this.images = images;
            });
    }

    getShownImages() {
        if (this.images.length === 0 || this.filtro === undefined || this.filtro === '') {
            return this.images;
        }

        return this.images.filter((v) => {
            if (v.name.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0) {
                return true;
            }
            return false;
        });
    }

}
