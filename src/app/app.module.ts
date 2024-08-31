import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { NgModule } from '@angular/core';
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
import { MainPageComponent } from './pages/main-page/main-page.component';

import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { OrderComponent } from './pages/orders-page/order/order.component';
import { SharedModule } from './shared/shared.module';
import { UserEffects } from './core/store/user/user.effects';

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
    StoreModule.forRoot({
      user: userReducer,
      trips: tripsReducer,
    }),
    EffectsModule.forRoot([TripsEffects, UserEffects]),
    StoreDevtoolsModule.instrument(),
    UserModule,
    SharedModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDividerModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([addTokenInterceptor])),
    FormControl,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
