import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ImageDisplayComponent } from '../image-display/image-display.component';
import { ImagePreviewService } from '../image-preview.service';
import { SimilarImageService } from '../similar-image.service';
import { Image, ImageCoordinates, ImageRegion } from '../image.interface';
import { ImageService } from '../image.service';
import { NeuralNetworkEvaluateService } from '../neural-network-evaluate.service';
import { ImageSettingsComponent } from './image-settings/image-settings.component';
import { researchTypes } from './image-settings/image-settings.constants';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, mapTo, pluck, switchMap, withLatestFrom } from 'rxjs/operators';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';

@Component({
    selector: 'app-image-item',
    templateUrl: './image-item.component.html',
    styleUrls: ['./image-item.component.scss'],
    providers: [ImagePreviewService],
})
export class ImageItemComponent implements OnInit, OnDestroy {
    public imageId$: BehaviorSubject<string>;
    properties$: BehaviorSubject<[]>;
    isLoading$ = new BehaviorSubject(false);
    searchResult$ = new Subject<{ selectedRegion: ImageRegion, mapImage: Image, regions: ImageRegion[] }>();
    coordinates$ = new Subject<ImageCoordinates>();

    @ViewChild(ImageDisplayComponent) display: ImageDisplayComponent;
    @ViewChild(ImageSettingsComponent) settings: ImageSettingsComponent;

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private imageService: ImageService,
        private similarImageService: SimilarImageService,
        private neuralNetworkEvaluateService: NeuralNetworkEvaluateService,
    ) {
    }

    ngOnInit() {
        this.imageId$ = new BehaviorSubject(this.route.snapshot.params.imageId);
        this.properties$ = new BehaviorSubject(this.route.snapshot.data.properties);
        this.route.params.pipe(pluck('imageId')).subscribe(this.imageId$);
        this.route.data.pipe(pluck('properties')).subscribe(this.properties$);

        const mapAndRegions = this.coordinates$.pipe(
            switchMap(coordinates => this.getMapAndRegions(coordinates)),
        );
        const selectedImage = this.coordinates$.pipe(
            withLatestFrom(this.imageId$),
            switchMap(([coordinates, imageId]) => this.imageService.readRegion(imageId, coordinates)),
        );
        combineLatest([mapAndRegions, selectedImage]).pipe(
            map(([{ mapImage, regions }, selectedRegion]) => ({ selectedRegion, mapImage, regions })),
        ).subscribe(this.searchResult$);

        this.coordinates$.pipe(mapTo(true)).subscribe(this.isLoading$);
        this.searchResult$.pipe(mapTo(false)).subscribe(this.isLoading$);
    }

    onSelect(event: ImageCoordinates) {
        const coordinates: ImageCoordinates = {
            x: event.x,
            y: event.y,
            width: event.width,
            height: event.height,
        };
        this.coordinates$.next(coordinates);
    }


    getMapAndRegions(coordinates: ImageCoordinates) {
        const settings = this.settings.settingsState$.getValue();
        switch (settings.type.id) {
            case researchTypes.NN:
                return this.neuralNetworkEvaluateService.evaluate(this.imageId$.getValue(), coordinates, settings).pipe(
                    map(({ mapImage, evaluatedRegions }) => ({ mapImage, regions: evaluatedRegions })),
                );

            case researchTypes.SIMILAR:
                return this.similarImageService.findSimilar(this.imageId$.getValue(), coordinates, settings).pipe(
                    map(({ mapImage, similarRegions }) => ({ mapImage, regions: similarRegions })),
                );
        }

    }

    ngOnDestroy() {
    }

}
