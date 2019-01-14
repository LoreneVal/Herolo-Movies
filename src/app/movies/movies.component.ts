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
  searchForm = new FormControl('');
  error = '';


  constructor(private movieService: MovieService, private dataStorageService: DataStorageService){}

  ngOnInit() {
    this.dataStorageService.fetchMovies();
    this.movieService.moviesChanged.subscribe(
      (movies: Movie[]) => {
        this.movies = movies;
      }
    );
    console.log(this.movieService.movies);
  }

  onSearchSubmit() {
    this.dataStorageService.fetchMoviesWithInfo(this.searchForm.value);
    this.movieService.moviesChanged.subscribe(
      (movies: Movie[]) => {
        this.movies = movies;
      }
    );
    console.log(this.movies.length)
    console.log(this.movies)
    if(this.movies.length == 0) {
      this.error = '0 results found';
    }
    console.log(this.dataStorageService.error)
    console.log(this.error);


  }
}
