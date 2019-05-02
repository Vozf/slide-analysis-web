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
import { FormsModule } from '@angular/forms';
import { PropertiesResolver, SettingsOptionsResolver } from './image-item/image-item-resolver.service';
import { ImageSettingsComponent } from './image-item/image-settings/image-settings.component';
import { UtilsModule } from '../utils/utils.module';
import { MaterialModule } from '../../material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SimilarityMapComponent } from './similarity-map/similarity-map.component';
import { MatIconModule, MatTreeModule } from '@angular/material';
import { ImageListTreeComponent } from './image-list/image-list-tree/image-list-tree.component';
import { ImageListService } from './image-list/image-list.service';
import { ImageListRecalculateModalComponent } from './image-list/image-list-recalculate-modal/image-list-recalculate-modal.component';
import { ImageListRecalculateProgressModalComponent } from './image-list/image-list-recalculate-progress-modal/image-list-recalculate-progress-modal.component';

const routes: Routes = [
    { path: '', component: ImageListComponent },
    {
        path: ':imageId',
        component: ImageItemComponent,
        resolve: {
            settingsOptions: SettingsOptionsResolver,
            properties: PropertiesResolver,
        },
    },
];

@NgModule({
    declarations: [
        ImageItemComponent,
        ImageListComponent,
        ImageListTreeComponent,
        ImageDisplayComponent,
        ImageSettingsComponent,
        SimilarityMapComponent,
        ImageListRecalculateModalComponent,
        ImageListRecalculateProgressModalComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        UtilsModule,
        MaterialModule,
        NgbModule,
        MatTreeModule,
        MatIconModule,
    ],
    providers: [
        ImageService,
        ImagePreviewService,
        SimilarImageService,
        NeuralNetworkEvaluateService,
        SettingsOptionsResolver,
        PropertiesResolver,
        ImageListService,
    ],
    entryComponents: [
        ImageListRecalculateModalComponent,
        ImageListRecalculateProgressModalComponent,
    ],
    exports: [RouterModule],
})
export class ImageModule {
}
