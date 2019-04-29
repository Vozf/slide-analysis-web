import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageFolder } from '../../image.interface';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';

@Component({
    selector: 'app-image-list-tree',
    templateUrl: './image-list-tree.component.html',
    styleUrls: ['./image-list-tree.component.scss'],
})

export class ImageListTreeComponent {

    @Input()
    set images(images: ImageFolder[]) {
        this.dataSource.data = images;
    }
    @Output() recalculate: EventEmitter<ImageFolder> = new EventEmitter();

    encode = encodeURIComponent;
    treeControl = new NestedTreeControl<ImageFolder>(node => (node as any).children);
    dataSource = new MatTreeNestedDataSource<ImageFolder>();
    hasChild = (_: number, node: ImageFolder) => {
        return node.children && node.children.length > 0;
    }

}
