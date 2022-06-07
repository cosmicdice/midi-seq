import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ClipboardModule } from 'ngx-clipboard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ChartComponent } from './home/chart/chart.component';
import { PresetsComponent } from './home/presets/presets.component';
import { ScalesComponent } from './home/scales/scales.component';
import { GateComponent } from './gate/gate.component';
import { SemitonesComponent } from './components/semitones/semitones.component';
import { SignPipe } from './pipes/sign.pipe';
import { ClickStopPropagation } from './directives/click-stop-propagation.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChartComponent,
    PresetsComponent,
    ScalesComponent,
    GateComponent,
    SemitonesComponent,
    SignPipe,
    ClickStopPropagation
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ClipboardModule
  ],
  providers: [{ provide: Window, useValue: window }],
  bootstrap: [AppComponent]
})
export class AppModule { }
