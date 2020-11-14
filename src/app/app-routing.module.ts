import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MovieComponent } from './components/movie/movie.component';

const routes: Routes = [
  {
    path: 'movies',
    component: MovieComponent,
  },
  {
    path: 'movies/:movieId',
    component: MovieDetailComponent,
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
