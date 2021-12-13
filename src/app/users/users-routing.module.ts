import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      { path: 'search', loadChildren: () => import('../user-search/user-search.module').then(m => m.UserSearchModule) },
      { path: ':id', loadChildren: () => import('../user/user.module').then(m => m.UserModule) }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
