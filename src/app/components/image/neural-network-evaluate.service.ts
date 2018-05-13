import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { concat, map, switchMap, toArray } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Image, ImageCoordinates, ImageCoordinatesWithScore, ImageRegionWithScore } from './image.interface';
import { ImageService } from './image.service';
import { ImageSettingsState } from './image-item/image-settings/image-settings.interface';


@Injectable()
export class NeuralNetworkEvaluateService {

    constructor(private http: HttpClient, private imageService: ImageService) {
    }

    evaluate(imageId: string, coordinates: ImageCoordinates, settings: ImageSettingsState): Observable<{
        evaluatedRegions: ImageRegionWithScore[];
        mapImage: Image;
    }> {
        return this.evaluateCoordinates(imageId, coordinates, settings).pipe(
            concat(this.getMap(imageId, coordinates)),
            toArray(),
            map(([similarRegions, mapImage]) => ({
                evaluatedRegions: similarRegions as ImageRegionWithScore[],
                mapImage: mapImage as Image,
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

    private evaluateCoordinates(imageId: string,
                                coordinates: ImageCoordinates,
                                settings: ImageSettingsState): Observable<ImageRegionWithScore[]> {
        return this.http.post<ImageCoordinatesWithScore[]>(`images/neural_network_evaluate/${imageId}`, coordinates)
            .pipe(
                switchMap(imagesCoordinatesWithScore =>
                    forkJoin(...imagesCoordinatesWithScore.map(imageCoordinatesWithScore =>
                        this.imageService.readRegion(imageId, imageCoordinatesWithScore).pipe(
                            map(image => ({ ...image, coordinates: imageCoordinatesWithScore })),
                        )))),
            );
    }
}
