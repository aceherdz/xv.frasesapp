import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFraseComponent } from './coomponents/add-frase/add-frase.component';
import { ManRepoComponent } from './coomponents/man-repo/man-repo.component';
import { RandomFraseComponent } from './coomponents/random-frase/random-frase.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: RandomFraseComponent },
  { path: 'add', component: AddFraseComponent },
  { path: 'repo', component: ManRepoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
