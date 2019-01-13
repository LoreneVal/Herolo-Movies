import { Component, OnInit } from '@angular/core';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';
import { FormControl } from '@angular/forms';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [MovieService, DataStorageService]
})
export class MoviesComponent implements OnInit {
  movies: Movie[];
  addedMovies: Movie[];
  searchForm = new FormControl('');
  searchResults: Movie[] = [];
  hasSearch = false;
  error = '';

  noMovieFound = false;

  constructor(private movieService: MovieService, private dataStorageService: DataStorageService){}

  ngOnInit() {
    this.hasSearch = false;
    this.dataStorageService.fetchMovies();
    this.movieService.moviesChanged.subscribe(
      (movies: Movie[]) => {
        this.movies = movies;
      }
    );
  }

  onSearchSubmit() {
    this.hasSearch = true;
    this.dataStorageService.fetchMovies(this.searchForm.value);
    this.movieService.moviesChanged.subscribe(
      (movies: Movie[]) => {
        this.movies = movies;
      }
    );
    this.error = this.dataStorageService.error;
    console.log(this.movieService.movies);
  }
}
