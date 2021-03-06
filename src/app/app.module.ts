import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { defaultSimpleModalOptions, SimpleModalModule } from "ngx-simple-modal";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MatModule } from "./mat.module";
import { AuthEffects } from "./auth/auth.effects";
import { authReducer } from "./auth/auth.reducer";
import { HomeComponent } from "./home/home.component";
import { ListingComponent } from "./listing/listing.component";
import { ListingEffects } from "./listing/listing.effects";
import { listingReducer } from "./listing/listing.reducer";
import { NavigationModule } from "./navigation/navigation.module";
import { NewsComponent } from "./news/news.component";
import { SharedModule } from "./shared/shared.module";
import { sharedReducer } from "./shared/shared.reducer";
import { FavoriteComponent } from "./listing/favorite/favorite.component";
import { FavoriteListComponent } from "./listing/favorite-list/favorite-list.component";
import { SidenavComponent } from "./navigation/sidenav/sidenav.component";
import { ConfirmComponent } from "./auth/login/login.component";

@NgModule({
	declarations: [
		AppComponent,
		ListingComponent,
		FavoriteListComponent,
		FavoriteComponent,
		NewsComponent,
		HomeComponent,
		SidenavComponent,
		ConfirmComponent
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA], // for coingecko widgets
	entryComponents: [ConfirmComponent],
	imports: [
		CommonModule,
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
		StoreModule.forRoot({
			listing: listingReducer,
			shared: sharedReducer,
			auth: authReducer
		}),
		StoreDevtoolsModule.instrument(),
		EffectsModule.forRoot([ListingEffects, AuthEffects]),
		NoopAnimationsModule,
		MatModule,
		SharedModule,
		NavigationModule,
		SimpleModalModule.forRoot({container: 'modal-container'}, {...defaultSimpleModalOptions, ...{
			closeOnEscape: true,
			closeOnClickOutside: true,
			animationDuration: 300,
			autoFocus: true
		  }})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
