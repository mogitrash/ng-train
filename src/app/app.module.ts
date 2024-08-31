import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { tripsReducer } from './core/store/trips/trips.reducer';
import { userReducer } from './core/store/user/user.reducer';
import { TripsEffects } from './core/store/trips/trips.effects';
import { UserModule } from './features/user/user.module';
import { addTokenInterceptor } from './core/interceptors/add-token.interceptor';

import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/header/logo/logo.component';
import { MenuComponent } from './components/header/menu/menu.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { UserEffects } from './core/store/user/user.effects';
import { TripsModule } from './features/trips/trips.module';
import { OrderComponent } from './pages/orders-page/order/order.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    MenuComponent,
    NotFoundPageComponent,
    AdminPageComponent,
    OrdersPageComponent,
    ProfilePageComponent,
    SigninPageComponent,
    SignupPageComponent,
    MainPageComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TripsModule,
    StoreModule.forRoot({
      user: userReducer,
      trips: tripsReducer,
    }),
    EffectsModule.forRoot([TripsEffects, UserEffects]),
    StoreDevtoolsModule.instrument(),
    UserModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([addTokenInterceptor])),
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
