import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { tripsReducer } from './core/store/trips/trips.reducer';
import { userReducer } from './core/store/user/user.reducer';
import { TripsEffects } from './core/store/trips/trips.effects';
import { UserModule } from './features/user/user.module';
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
    StoreDevtoolsModule.instrument(),
    UserModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([addTokenInterceptor])
    )],

  bootstrap: [AppComponent],
})
export class AppModule { }
