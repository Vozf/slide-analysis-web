import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ImageListStoreModule } from './image-list-store';

@NgModule({
    imports: [
        CommonModule,
        ImageListStoreModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
    ],
    declarations: [],
})
export class RootStoreModule {}
