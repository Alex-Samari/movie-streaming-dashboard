import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  private movieId: Movie['id'];
  selectedMovie: Movie = null;
  rating = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService
  ) {
    this.activatedRoute.params.subscribe((params: any) => {
      this.movieId = params.movieId;
    });

    /**
     * following code is inefficient and can be removed with an API that gets the movie by Id
     * Currently the qurey API does NOT accept movie IDs as a parameter
     */
    this.movieService.getMovies().subscribe((movies) => {
      this.selectedMovie = movies.find((movie) => movie.id === this.movieId);
      this.rating = Math.floor(this.selectedMovie.imdb_rating / 2);
    });
  }

  ngOnInit(): void {}

  getYearFromDateString = (dateString: string) => {
    const year = new Date(dateString).getFullYear();
    return year;
  };

  getCastString = (cast: Movie['cast']): string => {
    const castString = cast.join(', ');
    return castString;
  };
}
