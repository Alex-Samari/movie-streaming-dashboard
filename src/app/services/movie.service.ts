import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { shareReplay, map, catchError } from 'rxjs/operators';
import { Movie } from '../models/movie.model';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer Wookie2019',
    }),
    params: null,
  };

  constructor(private http: HttpClient) {}

  getMovies = (): Observable<Movie[]> => {
    return this.http
      .get<Movie[]>(`${environment.apiURI}/movies`, this.httpOptions)
      .pipe(
        map((data: any) => data.movies),
        shareReplay(),
        catchError(() => throwError('User not found'))
      );
  };

  getMoviesByQuery = (queryParameter: string): Observable<Movie[]> => {
    this.httpOptions.params = new HttpParams().set('q', queryParameter);

    return this.http
      .get<Movie[]>(`${environment.apiURI}/movies`, this.httpOptions)
      .pipe(
        map((data: any) => data.movies),
        catchError(() => throwError('User not found'))
      );
  };
}
