import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentComponent} from './pages/student/student.component'
import {GrupComponent} from './pages/grup/grup.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/student' },
  { path: 'student', component: StudentComponent},
  { path: 'grup', component: GrupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
