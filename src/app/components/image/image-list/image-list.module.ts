import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImageListTreeComponent } from './image-list-tree/image-list-tree.component';
import { ImageListRecalculateModalComponent } from './image-list-recalculate-modal/image-list-recalculate-modal.component';
import { ImageListRecalculateProgressModalComponent } from './image-list-recalculate-progress-modal/image-list-recalculate-progress-modal.component';
import { ImageListComponent } from './image-list.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule, MatTreeModule } from '@angular/material';
import { ImageListService } from './image-list.service';
import { MaterialModule } from '../../../material.module';
import { UtilsModule } from '../../utils/utils.module';
import { RouterModule } from '@angular/router';
import { ImageService } from '../image.service';


@NgModule({
    declarations: [
        ImageListComponent,
        ImageListTreeComponent,
        ImageListRecalculateModalComponent,
        ImageListRecalculateProgressModalComponent,
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
    ],
    providers: [
        ImageListService,
        ImageService,
    ],
    entryComponents: [
        ImageListRecalculateModalComponent,
        ImageListRecalculateProgressModalComponent,
    ],
})
export class ImageListModule {
}
