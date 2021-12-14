import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { SelectComponent } from './select/select.component';


const routes: Routes = [
  {
    path: '', component: SelectComponent, children: [
      {
        path: ':slug',
        component: BlogComponent,
      },
      {
        path: '**',
        component: BlogComponent,
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class BlogRoutingModule { }

