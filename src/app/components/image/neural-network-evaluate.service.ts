import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { concat, map, switchMap, toArray } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { ImageCoordinates } from './interfaces/image-coordinates.interface';
import { ImageRegion } from './interfaces/image-region.interface';
import { Image } from './interfaces/image.interface';
import { ImageService } from './image.service';


@Injectable()
export class NeuralNetworkEvaluateService {

    constructor(private http: HttpClient, private imageService: ImageService) {
    }

    evaluate(imageId: string, coordinates: ImageCoordinates): Observable<{
        similarRegions: ImageRegion[];
        similarityMap: Image;
    }> {
        return this.evaluateCoordinates(imageId, coordinates).pipe(
            concat(this.getMap(imageId, coordinates)),
            toArray(),
            map(([similarRegions, similarityMap]) => ({
                    similarRegions: similarRegions as ImageRegion[],
                    similarityMap: similarityMap as Image,
                }),
            ));
    }

    getMap(imageId: string, coordinates: ImageCoordinates): Observable<Image> {
        const { x, y, width, height } = coordinates;
        const queryParams = new HttpParams()
            .append('x', x.toString())
            .append('y', y.toString())
            .append('width', width.toString())
            .append('height', height.toString());

        return this.http.get(`images/neural_network_evaluate/${imageId}/map`,
            { responseType: 'blob', params: queryParams }).pipe(
            switchMap(image => this.imageService.getBase64FromBlob(image)),
            map(base64 => ({ base64 })),
        );
    }

    private evaluateCoordinates(imageId: string, coordinates: ImageCoordinates): Observable<ImageRegion[]> {
        return this.http.post<ImageCoordinates[]>(`images/neural_network_evaluate/${imageId}`, coordinates).pipe(
            switchMap(imagesCoordinates => forkJoin(...imagesCoordinates.map(imageCoordinates => this.imageService.readRegion(imageId, imageCoordinates))))
        );
    }
}
