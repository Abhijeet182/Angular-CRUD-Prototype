import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdduserComponent } from './adduser/adduser.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { ViewuserComponent } from './viewuser/viewuser.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    {
      path: '',
      component: DashboardComponent,
    },
    {
      path: 'adduser',
      component: AdduserComponent,
    },
    {
      path: 'updateuser/:id',
      component: UpdateuserComponent,
    },
    {
      path: 'viewuser/:id',
      component: ViewuserComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
