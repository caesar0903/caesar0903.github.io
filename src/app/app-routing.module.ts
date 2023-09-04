import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component'

const routes: Routes = [
  {
    path:'',
    children:[
      { path: 'home',component: UserLoginComponent },
      { path: '',redirectTo: '/home',pathMatch:'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
