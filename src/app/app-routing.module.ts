import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserregComponent } from './userreg/userreg.component';

const routes: Routes = [
  { component: HomeComponent, path: '' },
  { component: UserregComponent, path: 'userreg' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  // constructor(private router: Router) {}
  // onSubmit() {
  //   // submit form logic here
  //   this.submittedFormData = this.registrationForm.value;
  //   this.router.navigate(['/profile']);
  // }
}
