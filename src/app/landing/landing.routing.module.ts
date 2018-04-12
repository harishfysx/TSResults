import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchComponent} from './search/search.component';
import {LandingComponent} from './landing.component';
import {AnalyticsComponent} from './analytics/analytics.component';


const routes: Routes = [
      {path: '', component: LandingComponent, children: [
      { path: 'search', component: SearchComponent },
        { path: 'analytics', component: AnalyticsComponent },
{ path: '**', component: SearchComponent }
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LandingRoutingModule {}
