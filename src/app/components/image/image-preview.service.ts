import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Image } from './image.interface';
import { ImageService } from './image.service';

@Injectable()
export class ImagePreviewService {

    constructor(private http: HttpClient, private imageService: ImageService) {
    }

    getPreviews(): Observable<Image[]> {
        return this.http.get<any[]>('images/previews').pipe(
            map(res => res.map(({ name }) => name)),
            switchMap(names => forkJoin(...names.map(name => this.getPreview(name)))),
        );
    }

    getPreview(name: string): Observable<Image> {
        return this.http.get(`images/previews/${name}`, { responseType: 'blob' }).pipe(
            switchMap(image => this.imageService.getBase64FromBlob(image)),
            map(base64 => ({ base64, name })),
        );
    }

}
