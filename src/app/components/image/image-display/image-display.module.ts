import { ImageDisplayComponent } from './image-display.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


@NgModule({
    declarations: [
        ImageDisplayComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [ImageDisplayComponent],
})
export class ImageDisplayModule {
}
