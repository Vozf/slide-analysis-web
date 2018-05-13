import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as OpenSeadragon from 'openseadragon';
import 'openseadragonselection';
import { api_path } from '../../../global';
import { ImageCoordinates, ImageCoordinatesWithScore, ImageDimensions } from '../image.interface';

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
    @Input() imageId: string;

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

        this.openSlide(this.imageId);
        this.viewer.addHandler('open', () => {
            this.viewer.source.minLevel = 8;
            this.dimensions = this.viewer.world.getItemAt(0).getContentSize();
        });

        var overlay = this.viewer.canvasOverlay({
            onRedraw: function () {
                overlay.context2d().fillStyle = 'rgba(255,0,0,0.5)';
                overlay.context2d().fillRect(0, 0, 10000, 500);
            },
        });
    }

    openSlide(imageId) {
        const url = `${api_path}/images/dzi/${imageId}`;
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
