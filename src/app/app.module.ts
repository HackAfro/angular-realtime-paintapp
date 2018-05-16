import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CanvasDirective } from './canvas.directive';
import { PusherService } from './pusher.service';

@NgModule({
  declarations: [AppComponent, CanvasDirective],
  imports: [BrowserModule, HttpClientModule],
  providers: [PusherService],
  bootstrap: [AppComponent],
})
export class AppModule {}
