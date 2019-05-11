import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageItemComponent } from './image-item/image-item.component';
import { ImageListComponent } from './image-list/image-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropertiesResolver, SettingsOptionsResolver } from './image-item/image-item-resolver.service';
import { UtilsModule } from '../utils/utils.module';
import { MaterialModule } from '../../material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageListModule } from './image-list/image-list.module';
import { ImageItemModule } from './image-item/image-item.module';

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

    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        UtilsModule,
        MaterialModule,
        NgbModule,
        ImageItemModule,
        ImageListModule,
    ],
    providers: [
        SettingsOptionsResolver,
        PropertiesResolver,
    ],
    entryComponents: [
    ],
    exports: [RouterModule],
})
export class ImageModule {
}
