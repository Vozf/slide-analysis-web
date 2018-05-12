import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ImageDisplayComponent } from '../image-display/image-display.component';
import { ImagePreviewService } from '../image-preview.service';
import * as _ from 'lodash';
import { SimilarImageService } from '../similar-image.service';
import { Image } from '../interfaces/image.interface';
import { ImageRegion } from '../interfaces/image-region.interface';
import { map } from 'rxjs/operators';
import { ImageService } from '../image.service';
import { NeuralNetworkEvaluateService } from '../neural-network-evaluate.service';

@Component({
  selector: 'app-image-item',
  templateUrl: './image-item.component.html',
    styleUrls: ['./image-item.component.scss'],
    providers: [ImagePreviewService]
})
export class ImageItemComponent implements OnInit, OnDestroy {
  public imageId: string;
    public similarRegions: ImageRegion[] = [];
    public selectedRegion: ImageRegion;
    public similarityMap: Image;
    properties = [];
  @ViewChild(ImageDisplayComponent) display: ImageDisplayComponent;

    constructor(private route: ActivatedRoute,
                private http: HttpClient,
                private imageService: ImageService,
                private similarImageService: SimilarImageService,
                private neuralNetworkEvaluateService: NeuralNetworkEvaluateService,
    ) {
  }

  ngOnInit() {
      this.route.params.subscribe(params => {
      this.imageId = params['id'];
    });
      this.imageService.getSlideProperties(this.imageId).pipe(map(Object.entries))
          .subscribe(properties => this.properties = properties);

  }

  onSelect(event) {
    const body = _.pick(event, ['x', 'y', 'width', 'height']);
      console.log(body);
      this.similarImageService.findSimilar(this.imageId, body)
          .subscribe(({ similarityMap, similarRegions }) => {
              this.similarityMap = similarityMap;
              this.similarRegions = similarRegions;
          });

      this.imageService.readRegion(this.imageId, body)
          .subscribe(selectedRegion => this.selectedRegion = selectedRegion);
  }

  ngOnDestroy() {
  }

}
