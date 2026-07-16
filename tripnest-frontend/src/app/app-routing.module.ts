import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  // Public Views
  { 
    path: '', 
    loadChildren: () => import('./features/landing/landing.module').then(m => m.LandingModule) 
  },
  { 
    path: 'login', 
    loadChildren: () => import('./features/auth/login/login.module').then(m => m.LoginModule) 
  },
  { 
    path: 'register', 
    loadChildren: () => import('./features/auth/register/register.module').then(m => m.RegisterModule) 
  },
  { 
    path: 'admin-login', 
    loadChildren: () => import('./features/auth/admin-login/admin-login.module').then(m => m.AdminLoginModule) 
  },
  { 
    path: 'listing', 
    loadChildren: () => import('./features/listing/listing.module').then(m => m.ListingModule) 
  },
  { 
    path: 'details/:id', 
    loadChildren: () => import('./features/details/details.module').then(m => m.DetailsModule) 
  },

  // Logged-in User Views (Guard Restricted)
  { 
    path: 'dashboard', 
    loadChildren: () => import('./features/user/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USER'] }
  },
  { 
    path: 'booking/:id', 
    loadChildren: () => import('./features/user/booking/booking.module').then(m => m.BookingModule),
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USER'] }
  },
  { 
    path: 'success/:bookingId', 
    loadChildren: () => import('./features/user/success/success.module').then(m => m.SuccessModule),
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USER'] }
  },
  { 
    path: 'history', 
    loadChildren: () => import('./features/user/history/history.module').then(m => m.HistoryModule),
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USER'] }
  },
  { 
    path: 'profile', 
    loadChildren: () => import('./features/user/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USER'] }
  },
  { 
    path: 'wishlist', 
    loadChildren: () => import('./features/user/wishlist/wishlist.module').then(m => m.WishlistModule),
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USER'] }
  },

  // Admin Views (Guard Restricted)
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./features/admin/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'spots',
        loadChildren: () => import('./features/admin/spots/spots.module').then(m => m.SpotsModule)
      },
      {
        path: 'bookings',
        loadChildren: () => import('./features/admin/bookings/bookings.module').then(m => m.BookingsModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },

  // Catch-all Redirect
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
