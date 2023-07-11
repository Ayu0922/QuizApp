import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionComponent } from './question/question.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  {path:'',redirectTo:'header',pathMatch:'full'},
 
  {path:'question',component:QuestionComponent},
  {path:'header',component:HeaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
