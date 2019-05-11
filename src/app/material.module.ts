import { NgModule } from '@angular/core';
import {
    MatInputModule, MatCardModule, MatSidenavModule,
    MatGridListModule, MatDialogModule, MatToolbarModule, MatButtonModule, MatMenuModule,
} from '@angular/material';

@NgModule({
    imports: [
        MatInputModule,
        MatCardModule,
        MatGridListModule,
        MatDialogModule,
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,
        MatMenuModule,
    ],
    exports: [
        MatInputModule,
        MatCardModule,
        MatGridListModule,
        MatDialogModule,
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,
        MatMenuModule,
    ],
})
export class MaterialModule {
}