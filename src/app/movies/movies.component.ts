import { Component, OnInit } from '@angular/core';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';
import { FormControl } from '@angular/forms';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[];
  subscription: Subscription;
  searchForm = new FormControl('');
  error = '';

  constructor(private movieService: MovieService, private dataStorageService: DataStorageService){}

  ngOnInit() {
    this.dataStorageService.fetchMovies('love');
    this.subscription = this.movieService.moviesChanged.subscribe(
      (movies: Movie[]) => {
        this.movies = movies;
      }
    );
  }

  onSearchSubmit() {
    this.dataStorageService.fetchMovies(this.searchForm.value);
    this.error = this.dataStorageService.error;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
