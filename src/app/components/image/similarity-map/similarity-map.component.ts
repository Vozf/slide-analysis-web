import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {Image} from '../image.interface';

@Component({
    selector: 'app-similarity-map',
    templateUrl: './similarity-map.component.html',
    styleUrls: ['./similarity-map.component.scss'],
})
// TODO consider using angular-resizable-element instead of current custon implementation of resize
export class SimilarityMapComponent implements OnInit {

    @Input() mapImage: Image;

    @Input() parent: HTMLElement;

    x: number;
    y: number;
    px: number;
    py: number;
    width: number;
    height: number;
    minWidth: number;
    minHeight: number;
    maxWidth: number;
    maxHeight: number;
    draggingCorner: boolean;
    resizer: Function;

    constructor() {
        this.minWidth = 50;
        this.minHeight = 50;
        this.width = this.minWidth;
        this.height = this.minHeight;
    }

    ngOnInit() {
    }

    updateContainerSize(img: HTMLImageElement) {
        this.updateParentSize();
        this.width = (img.naturalWidth > this.maxWidth) ? this.maxWidth
            : (this.minWidth < img.naturalWidth) ? img.naturalWidth : this.minWidth;
        this.height = (img.naturalHeight > this.maxHeight) ? this.maxHeight
            : (this.minHeight < img.naturalHeight) ? img.naturalHeight : this.minHeight;
    }

    // TODO listen to parent resize. Probably using angular-resize-event
    updateParentSize() {
        const parentStyles = getComputedStyle(this.parent);
        const parentHeight = this.parent.clientHeight;  // height with padding
        const parentWidth = this.parent.clientWidth;   // width with padding

        this.maxHeight = parentHeight - (parseFloat(parentStyles.paddingTop) + parseFloat(parentStyles.paddingBottom));
        this.maxWidth = parentWidth - (parseFloat(parentStyles.paddingLeft) + parseFloat(parentStyles.paddingRight));
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
        this.draggingCorner = false;
    }
}
