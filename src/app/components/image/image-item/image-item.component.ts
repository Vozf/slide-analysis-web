import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { ImageDisplayComponent } from '../image-display/image-display.component';
import {ImageListItem, ImageService} from '../image.service';


export interface ImageCoordinates {
  x: number;
  y: number;
}

@Component({
  selector: 'app-image-item',
  templateUrl: './image-item.component.html',
  styleUrls: ['./image-item.component.scss'],
  providers: [ImageService]
})
export class ImageItemComponent implements OnInit, OnDestroy {
  private routerSub: Subscription;
  public imageId: string;
  public images: ImageListItem[] = [];
  public similarityMap: ImageListItem;
  public isSimilarityMapPresnt: boolean;
  @ViewChild(ImageDisplayComponent) display: ImageDisplayComponent;

  constructor(private route: ActivatedRoute, private http: HttpClient,
              private imageService: ImageService) {
    this.similarityMap = new ImageListItem('map');
  }

  ngOnInit() {
    console.log('init');

    this.routerSub = this.route.params.subscribe(params => {
      this.imageId = params['id'];
    });

  }

  onSelect(event) {
    const body = _.pick(event, ['x', 'y', 'width', 'height']);
    this.http.post<ImageCoordinates[]>(`image/${this.imageId}/similar`, body)
      .subscribe(images => {
          this.images.length = 0;
          images.forEach(image => {
            this.imageService
              .getImage('image/' + this.imageId + '/similar/' + image.x + '_' + image.y)
              .subscribe(data => {
                const imageListItem =
                  new ImageListItem(image.x.toString() + '_' + image.y.toString());
                this.imageService.createImageFromBlob(imageListItem, data);
                this.images.push(imageListItem);
              });
          });
          this.imageService
            .getImage('image/similar/map')
            .subscribe(data => {
              this.imageService.createImageFromBlob(this.similarityMap, data);
              this.isSimilarityMapPresnt = true;
            });
        images.forEach(cur => console.log(cur));
        // this.display.setViewCenter();
      });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

}
