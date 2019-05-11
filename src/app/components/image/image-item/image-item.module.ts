import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule, MatTreeModule } from '@angular/material';
import { MaterialModule } from '../../../material.module';
import { UtilsModule } from '../../utils/utils.module';
import { RouterModule } from '@angular/router';
import { ImageDisplayModule } from '../image-display/image-display.module';
import { ImageItemComponent } from './image-item.component';
import { ImageSettingsComponent } from './image-settings/image-settings.component';
import { ImageService } from '../image.service';
import { SimilarImageService } from '../similar-image.service';
import { NeuralNetworkEvaluateService } from '../neural-network-evaluate.service';


@NgModule({
    declarations: [
        ImageItemComponent,
        ImageSettingsComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        UtilsModule,
        MaterialModule,
        NgbModule,
        MatTreeModule,
        MatIconModule,
        RouterModule,
        ImageDisplayModule,
    ],
    providers: [
        ImageService,
        SimilarImageService,
        NeuralNetworkEvaluateService,
    ],
    entryComponents: [
    ],
})
export class ImageItemModule {
}
