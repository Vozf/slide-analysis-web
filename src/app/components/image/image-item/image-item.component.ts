import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ImageDisplayComponent } from '../image-display/image-display.component';
import { ImagePreviewService } from '../image-preview.service';
import { SimilarImageService } from '../similar-image.service';
import { Image, ImageCoordinates, ImageRegion, ImageRegionWithScore } from '../image.interface';
import { ImageService } from '../image.service';
import { NeuralNetworkEvaluateService } from '../neural-network-evaluate.service';
import { ImageSettingsComponent } from './image-settings/image-settings.component';
import { researchTypes } from './image-settings/image-settings.constants';
import {LoaderComponent} from '../../utils/loader/loader.component';
import {MatSidenav} from '@angular/material';

@Component({
    selector: 'app-image-item',
    templateUrl: './image-item.component.html',
    styleUrls: ['./image-item.component.scss'],
    providers: [ImagePreviewService],
})
export class ImageItemComponent implements OnInit, OnDestroy {
    public imageId: string;
    imageRegions: ImageRegion[] | ImageRegionWithScore[] = [];
    selectedRegion: ImageRegion;
    mapImage: Image;
    properties = [];

    @ViewChild(ImageDisplayComponent) display: ImageDisplayComponent;
    @ViewChild(ImageSettingsComponent) settings: ImageSettingsComponent;
    @ViewChild('imageSidenav') imageSidenav: MatSidenav;
    @ViewChild('rightSidenav') rightSidenav: MatSidenav;
    isLoading = false;

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private imageService: ImageService,
        private similarImageService: SimilarImageService,
        private neuralNetworkEvaluateService: NeuralNetworkEvaluateService,
    ) {
    }

    ngOnInit() {
        this.imageId = this.route.snapshot.params.imageId;
        this.properties = this.route.snapshot.data.properties;
    }

    onSelect(event: ImageCoordinates) {
        const settings = this.settings.settingsState$.getValue();
        const coordinates: ImageCoordinates = {
            x: event.x,
            y: event.y,
            width: event.width,
            height: event.height,
        };
        console.log(coordinates);
        this.clearImageRegions();
        this.startLoading();
        switch (settings.type.id) {
            case researchTypes.NN:
                this.neuralNetworkEvaluateService.evaluate(this.imageId, coordinates, settings)
                    .subscribe(({ mapImage, evaluatedRegions }) => {
                        this.mapImage = mapImage;
                        this.imageRegions = evaluatedRegions;
                        this.finishLoading();
                        console.log(evaluatedRegions);
                    });

                break;
            case researchTypes.SIMILAR:
                this.similarImageService.findSimilar(this.imageId, coordinates, settings)
                    .subscribe(({ mapImage, similarRegions }) => {
                        this.mapImage = mapImage;
                        this.imageRegions = similarRegions;
                        this.finishLoading();
                    });
                break;
        }

        this.imageService.readRegion(this.imageId, coordinates)
            .subscribe(image => this.selectedRegion = <ImageRegion>{...image, coordinates});

        this.display.toggleSelectionState();
    }

    clearImageRegions() {
        this.imageRegions = [];
    }

    startLoading() {
        this.imageSidenav.close();
        this.rightSidenav.close();
        this.isLoading = true;
    }

    finishLoading() {
        this.isLoading = false;
        this.imageSidenav.open();
    }

    ngOnDestroy() {
    }

}
