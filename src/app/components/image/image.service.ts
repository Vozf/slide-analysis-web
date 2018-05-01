import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

export class ImageListItem {
  name: string;
  imageToShow: any;
  constructor(name: string) {
    this.name = name;
  }
}

@Injectable()
export class ImageService {

  constructor(private http: HttpClient) { }

  getImages(imagesUrl): Observable<ImageListItem[]> {
    return this.http.get<ImageListItem[]>(imagesUrl);
  }

  getImage(imageUrl: string): Observable<Blob> {
    return this.http
      .get(imageUrl, { responseType: 'blob' });
  }

  createImageFromBlob(imageListItem: ImageListItem, image: Blob): any {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      imageListItem.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
