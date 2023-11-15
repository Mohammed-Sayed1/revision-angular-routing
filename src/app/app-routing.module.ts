import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { SubUsersComponent } from './sub-users/sub-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { CategoriesComponent } from './categories/categories.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { DeactivateGuardService } from './services/guards/deactivate-guard.service';
import { UserResolveService } from './services/resolvers/user-resolve.service';

/* in Routes we write the path after domain/  */
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  /* we use property children to make nested routes (means those are sub components) and put <router-outlet></router-outlet> tag in the component where we want to display those sub component,
  and we can make nested nested routing like this => {path: 'users', component: UsersComponent, children: [{path: ':id/:name', component: SubUsersComponent, children: [{path: '', component: sub-sub-component}]}]} */
  {
    path: 'users',
    component: UsersComponent,
    /* canActivate: will excute the logic in canActivate() function inside AuthGuardServise, and depends on this logic will proceed or not with this route(link), and this will affect child routes */
    canActivate: [AuthGuardService],

    /* canActivateChild: will excute the logic in canActivateChild() function inside AuthGuardServise, and depends on this logic will proceed or not with this route(link), and this will affect child routes */
    // canActivateChild: [AuthGuardService],
    children: [
      { path: ':id/:name', component: SubUsersComponent },
      {
        path: ':id/:name/edit',
        component: EditUserComponent,
        canDeactivate: [DeactivateGuardService],
        /* After getting the date from backend in UserResolveService, then we set UserResolveService as a value of an object property and the name of the property is up to you.
        then angular will set what is returned from UserResolveService wrapped in an object like below in route.params.data */
        resolve: {user: UserResolveService}
      },
    ],
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    /* we use data property when we want to pass a static data to backend, this will appear in the route(link) */
    data: { category: 1, product: 1 },
  },
  { path: 'not-found', component: PageNotFoundComponent },
  /* the will redirect to PageNotFoundComponent in case the user write a route(link) which doesn't match any of above routes(links), and it must be at the end of appRoutes array */
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
