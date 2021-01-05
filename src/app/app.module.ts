import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListingComponent } from './listing/listing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoinIndicatorDirective } from '../directives/coin-indicator.directive';
import { MatModule } from './mat.module';
import { NewsComponent } from './news/news.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { ListingEffects } from './listing/listing.effects';
import { sharedReducer } from './shared/shared.reducer';
import { listingReducer } from './listing/listing.reducer';

@NgModule({
  declarations: [AppComponent, ListingComponent, CoinIndicatorDirective, NewsComponent, HomeComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({ 
      listing: listingReducer,
      shared: sharedReducer
     }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([ListingEffects]),
    NoopAnimationsModule,
    MatModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
