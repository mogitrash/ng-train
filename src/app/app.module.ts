import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { EffectsModule } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { tripsReducer } from './core/store/trips/trips.reducer';
import { userReducer } from './core/store/user/user.reducer';
import { TripsEffects } from './core/store/trips/trips.effects';
import { addTokenInterceptor } from './core/interceptors/add-token.interceptor';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      user: userReducer,
      trips: tripsReducer,
    }),
    EffectsModule.forRoot([TripsEffects]),
  ],
  providers: [provideAnimationsAsync(), provideStoreDevtools(), provideHttpClient(
    withInterceptors([addTokenInterceptor])
  )],
  bootstrap: [AppComponent],
})
export class AppModule { }
