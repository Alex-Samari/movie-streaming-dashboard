import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  genres: Movie['genres'] = [];
  movies: Movie[] = [];

  constructor(
    private movieService: MovieService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.movieService.getMovies().subscribe((movies) => {
      this.movies = movies;
      // Get movie genres from the list of movies
      for (const movie of movies) {
        for (const genre of movie.genres) {
          if (
            !this.genres.find(
              (savedGenre) => savedGenre === genre.toLocaleLowerCase()
            )
          ) {
            this.genres.push(genre.toLocaleLowerCase());
          }
        }
      }
      this.genres.sort();
    });
  }

  ngOnInit(): void {}

  isGenreInMovie = (movie: Movie, genre: string) => {
    if (
      movie.genres.find(
        (item) => item.toLocaleLowerCase() === genre.toLocaleLowerCase()
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  openMovieDetails = (movieId: Movie['id']) => {
    this.router.navigate([movieId], { relativeTo: this.activatedRoute });
  };
}
