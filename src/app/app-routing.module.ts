import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentComponent} from './pages/student/student.component'
import {GrupComponent} from './pages/grup/grup.component'
import { SecretSantaComponent } from './pages/secret-santa/secret-santa.component';
import { ResultsComponent } from './pages/results/results.component';
import { LoginComponent } from './pages/login/login.component';
import { ShellComponent } from './pages/shell/shell.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { 
    path: '', 
    component: ShellComponent,
    children: [
      { path: 'santa', component: SecretSantaComponent},
      { path: 'students', component: StudentComponent},
      { path: 'grups', component: GrupComponent},
      { path: 'results', component: ResultsComponent},
    ]
  },
  { 
    path: 'login', 
    component: LoginComponent
  },
  { path: '**', redirectTo: 'santa', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }