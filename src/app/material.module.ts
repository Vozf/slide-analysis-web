import { NgModule } from '@angular/core';
import {
  MatInputModule, MatProgressSpinnerModule, MatCardModule,
  MatGridListModule
} from '@angular/material';

@NgModule({
  imports: [MatInputModule, MatProgressSpinnerModule, MatCardModule, MatGridListModule],
  exports: [MatInputModule, MatProgressSpinnerModule, MatCardModule, MatGridListModule],
})
export class MaterialModule {
}
