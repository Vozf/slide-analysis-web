import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { concat, map, switchMap, toArray } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { ImageCoordinates } from './interfaces/image-coordinates.interface';
import { ImageRegion } from './interfaces/image-region.interface';
import { Image } from './interfaces/image.interface';


@Injectable()
export class ImageService {

    constructor(private http: HttpClient) {
    }

    findSimilar(imageId: string, coordinates: ImageCoordinates): Observable<{
        similarRegions: ImageRegion[];
        similarityMap: Image;
    }> {
        return this.getTopSimilar(imageId, coordinates).pipe(
            concat(this.getSimilarityMap(imageId, coordinates)),
            toArray(),
            map(([similarRegions, similarityMap]) => ({
                    similarRegions: similarRegions as ImageRegion[],
                    similarityMap: similarityMap as Image,
                }),
            ));
    }

    getSimilarityMap(imageId: string, coordinates: ImageCoordinates): Observable<Image> {
        const { x, y, width, height } = coordinates;
        const queryParams = new HttpParams()
            .append('x', x.toString())
            .append('y', y.toString())
            .append('width', width.toString())
            .append('height', height.toString());

        return this.http.get(`images/${imageId}/similar/map`,
            { responseType: 'blob', params: queryParams }).pipe(
            switchMap(image => this.getBase64FromBlob(image)),
            map(base64 => ({ base64 })),
        );
    }

    private getTopSimilar(imageId: string, coordinates: ImageCoordinates): Observable<ImageRegion[]> {
        return this.http.post<ImageCoordinates[]>(`images/${imageId}/similar`, coordinates).pipe(
            switchMap(imagesCoordinates => forkJoin(...imagesCoordinates.map(imageCoordinates => this.readRegion(imageId, imageCoordinates))))
        );
    }

    readRegion(imageId: string, coordinates: ImageCoordinates): Observable<ImageRegion> {
        const { x, y, width, height } = coordinates;
        const queryParams = new HttpParams()
            .append('x', x.toString())
            .append('y', y.toString())
            .append('width', width.toString())
            .append('height', height.toString());

        return this.http.get(`images/${imageId}/read_region`,
            { responseType: 'blob', params: queryParams }).pipe(
            switchMap(image => this.getBase64FromBlob(image)),
            map(base64 => ({ base64, coordinates })),
        );
    }

    getSlideProperties(imageId: string): Observable<any> {
        return this.http.get(`images/${imageId}/properties`);
    }

    getBase64FromBlob(image: Blob): Observable<string> {
        return new Observable(sub => {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                sub.next(reader.result);
                sub.complete();
            }, false);
            reader.readAsDataURL(image);
        });
    }

}
