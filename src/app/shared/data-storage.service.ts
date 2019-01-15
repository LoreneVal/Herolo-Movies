import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs';
import { forkJoin } from 'rxjs';

import { MovieService } from '../movies/movie.service';
import { Movie } from '../movies/movie.model';

//This is a JS function that transforms keys of an object to camelCase.
//This function is used because the API's keys have a capital letter as a first char
//which is not suitable with our model attributes
declare function toCamel(o);

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient, private movieService: MovieService) {}
  error: any;
  movies: Movie[] = [];

 //requests for movies from the API with s="query"
 //this request returns a list of movies with the "query" but there are only
 //the image, the title and the ID available
  getMovies(query: string) {
    return this.http.get<Movie[]>(this.getMovieUrlS(query));
  }

  //Fetch the movies with the previous request in order to get all the titles
  //Stores the titles in an Array
  //sendind requests on each title from the API with t="query"
  //these requests return only one movie each but with every information that we want
  fetchMovies(query: string) {
    let titles = [];
    let titleRequests = [];
    this.getMovies(query).subscribe((movies: Movie[]) => {
      this.movieService.setMovies(toCamel(movies)["search"]);
      for(let i = 0; i < this.movies.length; i++) {
        titles.push(this.movieService.seeMovies()[i]['title']);
      }
      for(let i = 0; i < titles.length; i++) {
        titleRequests.push(this.http.get(this.getMovieUrlT(titles[i])));
      }
      forkJoin(titleRequests).subscribe(
        (movies: Movie[]) => {
          this.movieService.setMovies(toCamel(movies))
        })
    }),
    this.movieService.moviesChanged.subscribe(
      (movies: Movie[]) => {
        this.movies = movies;
      }
    );
    if (this.movies.length = 0) {
      this.error = '0 retults found';
    }
  }

  private getMovieUrlT(query: string): string {
    return `https://www.omdbapi.com/?t=${query}&apikey=6d4e8e6`;
  }
  private getMovieUrlS(query: string): string {
    return `https://www.omdbapi.com/?type=movie&s=${query}&apikey=ad37881b`;
  }
}
