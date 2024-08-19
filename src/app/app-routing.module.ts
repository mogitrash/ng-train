import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';


const routes: Routes = [
  // Common routes
  // { path: '', component: MainPageComponent },

  // Guest routes
  { path: 'signup', component: SignupPageComponent, canActivate: [] },
  // { path: 'signin', component: SigninPageComponent, canActivate: [guestGuard] },

  // Users routes
  // {
  //   path: 'profile',
  //   component: ProfilePageComponent,
  //   canActivate: [userGuard],
  // },
  // {
  //   path: 'my-orders',
  //   component: UserOrdersPageComponent,
  //   canActivate: [userGuard],
  // },

  // Admin routes
  // { path: 'orders', component: OrdersPageComponent, canActivate: [adminGuard] },
  // { path: 'admin', component: AdminPageComponent, canActivate: [adminGuard] },

  // not found
  // {
  //   path: '**',
  //   redirectTo: '404',
  //   pathMatch: 'full',
  // },
  // {
  //   path: '404',
  //   pathMatch: 'full',
  //   component: NotFoundPageComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
