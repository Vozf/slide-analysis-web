import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'images', pathMatch: 'full' },
            {
                path: 'images',
                loadChildren: 'app/components/image/image.module#ImageModule',
            },
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
