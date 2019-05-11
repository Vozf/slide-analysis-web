import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as OpenSeadragon from 'openseadragon';
import 'openseadragonselection';
import { api_path } from '../../../global';
import { ImageCoordinates, ImageDimensions } from '../image.interface';
import { distinctUntilChanged } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';

declare var initOpenSeaDragonImagingHelper: (x: any) => void;
declare var initOpenSeadragonCanvasOverlay: (x: any) => void;

@Component({
    selector: 'app-image-display',
    templateUrl: './image-display.component.html',
    styleUrls: ['./image-display.component.scss'],
})
export class ImageDisplayComponent implements OnInit {
    private viewer: any;
    private imagingHelper: any;
    private overlay: any;

    dimensions: ImageDimensions;
    @Output() select: EventEmitter<ImageCoordinates> = new EventEmitter();
    @Input()
    set imageId(imageId: string) {
        this.imageId$.next(imageId);
    }

    @Input()
    set regions(regions) {
        this.regions$.next(regions);
    }

    private regions$: ReplaySubject<any> = new ReplaySubject<any>();
    private imageId$: ReplaySubject<string> = new ReplaySubject<string>();

    constructor() {
    }

    ngOnInit() {
        this.viewer = new OpenSeadragon({
            id: 'view',
            prefixUrl: `/assets/openseadragon/icons/`,
            showNavigator: true,
            timeout: 120000,
            animationTime: 0.5,
            blendTime: 0.1,
            constrainDuringPan: true,
            maxZoomPixelRatio: 2,
            minZoomLevel: 1,
            visibilityRatio: 1,
            zoomPerScroll: 2,
        });
        initOpenSeaDragonImagingHelper(OpenSeadragon);
        initOpenSeadragonCanvasOverlay(OpenSeadragon);

        this.imagingHelper = this.viewer.activateImagingHelper();


        this.viewer.selection({
            element: null, // html element to use for overlay
            showSelectionControl: true, // show button to toggle selection mode
            toggleButton: null, // dom element to use as toggle button
            showConfirmDenyButtons: true,
            styleConfirmDenyButtons: true,
            returnPixelCoordinates: true,
            keyboardShortcut: 'c', // key to toggle selection mode
            onSelection: rect => {
                this.select.emit(rect);
            },
        });

        this.viewer.addHandler('open', () => {
            this.viewer.source.minLevel = 8;
            this.dimensions = this.viewer.world.getItemAt(0).getContentSize();
        });

        this.overlay = this.viewer.canvasOverlay({
            onRedraw: () => {
            },
        });

        this.regions$.pipe(
            distinctUntilChanged(),
        ).subscribe(regions => {
            if (!regions || !regions.length) {
                return;
            }
            this.overlay.onRedraw = () => {
                regions.forEach(({ coordinates }) => {
                    const score = coordinates.score ? coordinates.score * 120 + 120 : 120;
                    this.overlay.context2d().fillStyle = `hsla(${score}, 50%, 50%, 0.75)`;
                    this.overlay.context2d().fillRect(coordinates.x, coordinates.y, coordinates.height,
                        coordinates.width);
                });

            };
            this.overlay._updateCanvas();
        });

        this.imageId$.subscribe(imageId => this.openSlide(imageId));
    }

    openSlide(imageId) {
        const url = `${api_path}/images/dzi/${encodeURIComponent(imageId)}`;
        console.log(url);
        this.viewer.open(url);
    }

    setViewCenter({ width, height, x, y }: ImageCoordinates) {
        const scaledWidth = width / this.dimensions.x,
            scaledHeight = height / this.dimensions.y,
            scaledX = (x + width / 2) / this.dimensions.x,
            scaledY = (y + height / 2) / this.dimensions.y;

        this.imagingHelper.setView(scaledWidth, scaledHeight,
            new OpenSeadragon.Point(scaledX, scaledY));
    }

}
