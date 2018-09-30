import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { APIInterceptorService } from './apiinterceptor.service';
import { MaterialModule } from './material.module';
import { UtilsModule } from './components/utils/utils.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
      UtilsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: APIInterceptorService,
    multi: true,
  }],
    bootstrap: [AppComponent],
})
export class AppModule {
}
