import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { concat, map, switchMap, toArray } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Image, ImageCoordinates, ImageRegion } from './image.interface';
import { ImageService } from './image.service';
import { ImageSettingsState, SimilarImageSettingsOptions } from './image-item/image-settings/image-settings.interface';


@Injectable()
export class SimilarImageService {

    constructor(private http: HttpClient, private imageService: ImageService) {
    }

    findSimilar(imageId: string, coordinates: ImageCoordinates, settings: ImageSettingsState): Observable<{
        similarRegions: ImageRegion[];
        mapImage: Image;
    }> {
        return this.getTopSimilar(imageId, coordinates, settings).pipe(
            concat(this.getSimilarityMap(imageId, coordinates)),
            toArray(),
            map(([similarRegions, mapImage]) => ({
                    similarRegions: similarRegions as ImageRegion[],
                mapImage: mapImage as Image,
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

        return this.http.get(`images/similar/${imageId}/map`,
            { responseType: 'blob', params: queryParams }).pipe(
            switchMap(image => this.imageService.getBase64FromBlob(image)),
            map(base64 => ({ base64 })),
        );
    }

    getSettings(): Observable<SimilarImageSettingsOptions> {
        return this.http.get<SimilarImageSettingsOptions>(`images/similar/additional_parameters`);
    }


    private getTopSimilar(imageId: string,
                          coordinates: ImageCoordinates,
                          { similarity, descriptor }: ImageSettingsState): Observable<ImageRegion[]> {
        return this.http
            .post<ImageCoordinates[]>(`images/similar/${imageId}`, {
                ...coordinates,
                similarity: similarity.id,
                descriptor: descriptor.id,
            })
            .pipe(
                switchMap(imagesCoordinates =>
                    forkJoin(...imagesCoordinates.map(imageCoordinates =>
                        this.imageService.readRegion(imageId, imageCoordinates).pipe(
                            map(image => ({ ...image, coordinates: imageCoordinates })),
                        )))),
            );
    }
}
