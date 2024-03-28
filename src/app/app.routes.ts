import { Routes } from '@angular/router';

export const routes: Routes = [
  {path:'',pathMatch:'full',title:'Students',loadComponent:()=>import('./screens/home/home.component').then(m=>m.HomeComponent)},
  {path:'students/:id',title:'Student Details',loadComponent:()=>import('./screens/student-details/student-details.component').then(m=>m.StudentDetailsComponent)},
];
