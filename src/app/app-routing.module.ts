import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './pages/student/student.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/student' },
  { path: 'student', component: StudentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
