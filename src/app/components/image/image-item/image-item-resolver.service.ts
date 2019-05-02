import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { SimilarImageService } from '../similar-image.service';
import { ImageService } from '../image.service';
import {
    ImageSettingsOptions,
} from './image-settings/image-settings.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class PropertiesResolver implements Resolve<any[]> {
    constructor(private imageService: ImageService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
        const imageId = route.params.imageId;
        return this.imageService.getSlideProperties(imageId).pipe(map(Object.entries));
    }
}

@Injectable()
export class SettingsOptionsResolver implements Resolve<ImageSettingsOptions> {
    constructor(private similarImageService: SimilarImageService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<ImageSettingsOptions> {
        return this.similarImageService.getSettings().pipe(
            map(similarImageSettingsOptions => ({
                    similarImageSettingsOptions: similarImageSettingsOptions,
                    neuralNetworkEvaluateSettingsOptions: {},
                }
            )),
        );
    }
}
