import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageItemComponent } from './image-item/image-item.component';
import { ImageListComponent } from './image-list/image-list.component';
import { ImageDisplayComponent } from './image-display/image-display.component';
import { CommonModule } from '@angular/common';
import { ImagePreviewService } from './image-preview.service';
import { SimilarImageService } from './similar-image.service';
import { NeuralNetworkEvaluateService } from './neural-network-evaluate.service';
import { ImageService } from './image.service';

const routes: Routes = [
    { path: '', component: ImageListComponent },
    { path: ':id', component: ImageItemComponent },
];

@NgModule({
    declarations: [
        ImageItemComponent,
        ImageListComponent,
        ImageDisplayComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
    ],
    providers: [
        ImageService,
        ImagePreviewService,
        SimilarImageService,
        NeuralNetworkEvaluateService,
    ],
    exports: [RouterModule],
})
export class ImageModule {
}
