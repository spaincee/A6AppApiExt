import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { SingleUserComponent } from './components/single-user/single-user.component';
import { UserFormComponent } from './components/user-form/user-form.component';

const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: 'home' },
  { path: "home", component: UserListComponent },
  { path: "user/:userid", component: SingleUserComponent },
  { path: "new", component: UserFormComponent },
  { path: "updateuser/:userid", component: UserFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
