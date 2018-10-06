import { NgModule } from '@angular/core';
import {
  MatInputModule, MatCardModule, MatSidenavModule,
  MatGridListModule, MatDialogModule,
} from '@angular/material';

@NgModule({
  imports: [MatInputModule, MatCardModule, MatGridListModule, MatDialogModule, MatSidenavModule],
  exports: [MatInputModule, MatCardModule, MatGridListModule, MatDialogModule, MatSidenavModule],
})
export class MaterialModule {
}
