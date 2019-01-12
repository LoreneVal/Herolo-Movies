import { Component, OnInit } from '@angular/core';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [MovieService]
})
export class MoviesComponent implements OnInit {
  movies: Movie[];
  addedMovies: Movie[];
  searchForm = new FormControl('');
  searchResults: Movie[];

  hasSearch = false;
  noMovieFound = false;

  constructor(private movieService: MovieService){}

  ngOnInit() {
    this.addedMovies = this.movieService.movies;

    this.movieService.getMovies().subscribe((movies: Movie[]) => {
      this.movies = movies;
    });

    this.searchForm.valueChanges
      .subscribe((value: string) => {
    if (value.length) {
      this.hasSearch = true;
      this.movieService.getMovies(value)
        .toPromise()
        .then(data => {
          this.searchResults = data;
        });
    } else {
      this.hasSearch = false;
    }
  });
  }
}
