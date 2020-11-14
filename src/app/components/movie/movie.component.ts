import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
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
  searchQuery: string;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((queryParams: any) => {
      this.searchQuery = queryParams.searchQuery;
      console.log('searchQuery', this.searchQuery);
      this.genres = [];
      this.movies = [];
      this.getMovies();
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

  getMovies = () => {
    if (this.searchQuery) {
      this.movieService
        .getMoviesByQuery(this.searchQuery)
        .pipe(take(1))
        .subscribe((movies) => {
          this.movies = movies;
          this.setMovieGenres(movies);
        });
    } else {
      this.movieService
        .getMovies()
        .pipe(take(1))
        .subscribe((movies) => {
          this.movies = movies;
          this.setMovieGenres(movies);
        });
    }
  };

  setMovieGenres = (movies: Movie[]) => {
    if (movies) {
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
    }
  };
}
