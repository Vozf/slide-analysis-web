import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ImageListStoreEffects } from './effects';
import { reducer } from './reducer';
import { ImagePreviewService } from '../../components/image/image-preview.service';
import { ImageService } from '../../components/image/image.service';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('imageList', reducer),
        EffectsModule.forFeature([ImageListStoreEffects]),
    ],
    providers: [ImageListStoreEffects, ImagePreviewService, ImageService],
})
export class ImageListStoreModule {}
