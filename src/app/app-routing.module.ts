import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieComponent } from './components/movie/movie.component';

const routes: Routes = [
  {
    path: 'movies',
    component: MovieComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'movies',
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
