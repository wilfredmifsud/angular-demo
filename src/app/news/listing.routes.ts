import { Routes } from "@angular/router";
import { ListingComponent } from "./news.component";

export const listingRoutes: Routes = [
  {
    path: "news",
    component: ListingComponent
  }
  {
    path: "first",
    component: ListingComponent
  },
  {
  path: "*",
  component: ListingComponent
}];
