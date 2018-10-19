import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Image, ImageCoordinates } from './image.interface';


@Injectable()
export class ImageService {

    constructor(private http: HttpClient) {
    }

    readRegion(imageId: string, coordinates: ImageCoordinates): Observable<Image> {
        const { x, y, width, height } = coordinates;
        const queryParams = new HttpParams()
            .append('x', x.toString())
            .append('y', y.toString())
            .append('width', width.toString())
            .append('height', height.toString());

        return this.http.get(`images/${imageId}/read_region`,
            { responseType: 'blob', params: queryParams }).pipe(
            switchMap(image => this.getBase64FromBlob(image)),
            map(base64 => ({ base64 })),
        );
    }

    getSlideProperties(imageId: string): Observable<any> {
        return this.http.get(`images/properties/${imageId}`);
    }

    getBase64FromBlob(image: Blob): Observable<string> {
        return new Observable(sub => {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                sub.next(reader.result as string);
                sub.complete();
            }, false);
            reader.readAsDataURL(image);
        });
    }

}
