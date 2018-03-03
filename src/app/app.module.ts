import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { APIInterceptorService } from './apiinterceptor.service';
import { ImageItemComponent } from './components/image/image-item/image-item.component';
import { ImageListComponent } from './components/image/image-list/image-list.component';
import { ImageDisplayComponent } from './components/image/image-display/image-display.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    ImageItemComponent,
    ImageListComponent,
    ImageDisplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: APIInterceptorService,
    multi: true,
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
