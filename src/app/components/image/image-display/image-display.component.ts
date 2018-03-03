import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as OpenSeadragon from 'openseadragon';
import 'openseadragonselection';
import { api_path } from '../../../global';

declare var initOpenSeaDragonImagingHelper: any;

@Component({
    selector: 'app-image-display',
    templateUrl: './image-display.component.html',
    styleUrls: ['./image-display.component.scss']
})
export class ImageDisplayComponent implements OnInit {
    private viewer: any;
    private imagingHelper: any;
    @Output() select: EventEmitter<any> = new EventEmitter();
    @Input() imageId: string;

    constructor() {
    }

    ngOnInit() {
        this.viewer = new OpenSeadragon({
            id: 'view',
            prefixUrl: `/assets/openseadragon/`,
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
        this.imagingHelper = this.viewer.activateImagingHelper();

        // this.viewer.addHandler('open', function () {
        //   // To improve load times, ignore the lowest-resolution Deep Zoom
        //   // levels.  This is a hack: we can't configure the minLevel via
        //   // OpenSeadragon configuration options when the viewer is created
        //   // from DZI XML.
        //   this.viewer.source.minLevel = 8;
        // });
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
    }

    openSlide(imageId) {
        const url = `${api_path}/image/${imageId}`;
        console.log(url);
        this.viewer.open(url);
    }

    setViewCenter({ width, height, x, y }) {
        // map to logical units with help of image width and height
        this.imagingHelper.setView(width, height, new OpenSeadragon.Point(x, y));
    }

}
