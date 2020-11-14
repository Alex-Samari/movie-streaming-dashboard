import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  movieSearch = new FormControl('');

  constructor(private router: Router) {}

  ngOnInit(): void {}

  searchMovies = (searchQuery: string) => {
    this.router.navigate(['./movies'], { queryParams: { searchQuery } });
  };
}
