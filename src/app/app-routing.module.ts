import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageListComponent } from './components/image/image-list/image-list.component';
import { ImageItemComponent } from './components/image/image-item/image-item.component';

const routes: Routes = [
    { path: '', redirectTo: 'image-list', pathMatch: 'full' },
    { path: 'images', component: ImageListComponent },
    { path: 'image/:id', component: ImageItemComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
