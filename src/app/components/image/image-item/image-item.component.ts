import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs/Subscription";
import { HttpClient } from "@angular/common/http";
import * as _ from "lodash";
import { ImageDisplayComponent } from "../image-display/image-display.component";

@Component({
  selector: 'app-image-item',
  templateUrl: './image-item.component.html',
  styleUrls: ['./image-item.component.scss']
})
export class ImageItemComponent implements OnInit, OnDestroy {
  private routerSub: Subscription;
  public imageId: string;
  @ViewChild(ImageDisplayComponent) display: ImageDisplayComponent;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit() {
    console.log('init');

    this.routerSub = this.route.params.subscribe(params => {
      this.imageId = params['id'];
    });

  }

  onSelect(event) {
    const body = _.pick(event, ['x', 'y', 'width', 'height']);
    this.http.post(`image/${this.imageId}/similar`, body)
      .subscribe(data => {
        console.log(data);
        this.display.setViewCenter(data[0])
      });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

}
