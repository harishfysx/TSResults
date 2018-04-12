import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LandingComponent} from './landing.component';
import {LandingRoutingModule} from './landing.routing.module';
import { SearchComponent } from './search/search.component';
import {AgmCoreModule} from '@agm/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {FormsModule} from '@angular/forms';
import {NiComponentsModule} from '../ni-components/ni-components.module';
import {UiModule} from '../ui/ui.module';
import { MatOptionModule, MatSelectModule, MatInputModule, MatButtonModule } from '@angular/material';
import {AnalyticsComponent} from './analytics/analytics.component';



@NgModule({
  imports: [
    UiModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    NiComponentsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAU9f7luK3J31nurL-Io3taRKF7w9BItQE'
    }),
    LandingRoutingModule
  ],
  declarations: [LandingComponent,
    SearchComponent,
    AnalyticsComponent,
    NavBarComponent],
  exports: []
})
export class LandingModule { }
