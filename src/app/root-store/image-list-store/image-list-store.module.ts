import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ImageListStoreEffects } from './effects';
import { reducer } from './reducer';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('imageList', reducer),
        EffectsModule.forFeature([ImageListStoreEffects]),
    ],
    providers: [ImageListStoreEffects],
})
export class ImageListStoreModule {}
