import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Image} from '../image.interface';

@Component({
    selector: 'app-similarity-map',
    templateUrl: './similarity-map.component.html',
    styleUrls: ['./similarity-map.component.scss'],
})
export class SimilarityMapComponent implements OnInit {

    @Input() mapImage: Image;

    x: number;
    y: number;
    px: number;
    py: number;
    width: number;
    height: number;
    minWidth: number;
    minHeight: number;
    draggingCorner: boolean;
    draggingWindow: boolean;
    resizer: Function;

    constructor() {
        this.width = 200;
        this.height = 200;
        this.minWidth = 50;
        this.minHeight = 50;
    }

    ngOnInit() {
    }

    onCornerClick(event: MouseEvent, resizer?: Function) {
        this.draggingCorner = true;
        this.px = event.clientX;
        this.py = event.clientY;
        this.resizer = resizer;
        event.preventDefault();
        event.stopPropagation();
    }

    bottomLeftResize(offsetX: number, offsetY: number) {
        this.x += offsetX;
        this.width -= offsetX;
        this.height += offsetY;
    }

    @HostListener('document:mousemove', ['$event'])
    onCornerMove(event: MouseEvent) {
        if (!this.draggingCorner) {
            return;
        }
        const offsetX = event.clientX - this.px;
        const offsetY = event.clientY - this.py;

        const lastX = this.x;
        const lastY = this.y;
        const pWidth = this.width;
        const pHeight = this.height;

        this.resizer(offsetX, offsetY);
        if (this.width < this.minWidth || this.height < this.minHeight) {
            this.x = lastX;
            this.y = lastY;
            this.width = pWidth;
            this.height = pHeight;
        }
        this.px = event.clientX;
        this.py = event.clientY;
    }

    @HostListener('document:mouseup', ['$event'])
    onCornerRelease(event: MouseEvent) {
        this.draggingWindow = false;
        this.draggingCorner = false;
    }
}
