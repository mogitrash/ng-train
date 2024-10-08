import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { UserOrdersPageComponent } from './pages/user-orders-page/user-orders-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { guestGuard } from './core/guards/guest.guard';
import { userGuard } from './core/guards/user.guard';
import { adminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  // Common routes
  { path: '', component: MainPageComponent },

  // Guest routes
  { path: 'signup', component: SignupPageComponent, canActivate: [guestGuard] },
  { path: 'signin', component: SigninPageComponent, canActivate: [guestGuard] },

  // Users routes
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [userGuard],
  },
  {
    path: 'my-orders',
    component: UserOrdersPageComponent,
    canActivate: [userGuard],
  },

  // Admin routes
  { path: 'orders', component: OrdersPageComponent, canActivate: [adminGuard] },
  { path: 'admin', component: AdminPageComponent, canActivate: [adminGuard] },

  // not found
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full',
  },
  {
    path: '404',
    pathMatch: 'full',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
