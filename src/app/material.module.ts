import { NgModule } from '@angular/core';
import {
  MatInputModule, MatProgressSpinnerModule, MatCardModule,
  MatGridListModule, MatDialogModule,
} from '@angular/material';

@NgModule({
  imports: [MatInputModule, MatProgressSpinnerModule, MatCardModule, MatGridListModule, MatDialogModule],
  exports: [MatInputModule, MatProgressSpinnerModule, MatCardModule, MatGridListModule, MatDialogModule],
})
export class MaterialModule {
}
