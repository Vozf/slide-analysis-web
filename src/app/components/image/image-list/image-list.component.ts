import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ImageListItem, ImageService} from '../image.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
  providers: [ImageService]
})
export class ImageListComponent implements OnInit {
  images: ImageListItem[] = [];

  private imageListUrl = `images`;

  constructor(private imageService: ImageService, private router: Router) {}

  ngOnInit() {
    this.getImages();
  }

  getImages(): void {
    this.imageService.getImages(this.imageListUrl)
      .subscribe(images => {
        this.images = images;
        this.images.forEach(image => {
          this.imageService.getImage(this.imageListUrl + '/' + image.name).subscribe(data => {
            this.imageService.createImageFromBlob(image, data);
            });
        });
      });
  }

  goToImage(imageUrl: string): void {
    this.router.navigate([`/image/${imageUrl}`]);
  }
}
