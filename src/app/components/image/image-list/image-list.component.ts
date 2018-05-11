import { Component, OnInit } from '@angular/core';
import { ImagePreviewService } from '../image-preview.service';
import { Image } from '../interfaces/image.interface';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
    styleUrls: ['./image-list.component.scss'],
    providers: [ImagePreviewService]
})
export class ImageListComponent implements OnInit {
    images: Image[] = [];

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

}
