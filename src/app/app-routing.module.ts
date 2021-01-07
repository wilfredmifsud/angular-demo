import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { listingRoutes } from './listing/listing.routes';
import { newsRoutes } from './news/news.routes';

const routes: Routes = [
  ...newsRoutes,
  ...listingRoutes,
  {
    "path": "home",
    component: HomeComponent

  },
  {
    "path": "",
    pathMatch: 'full',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
