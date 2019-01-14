import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs';
import { forkJoin } from 'rxjs';

import { MovieService } from '../movies/movie.service';
import { Movie } from '../movies/movie.model';

declare function toCamel(o);

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient, private movieService: MovieService) {}
  error: string = '';
  movies: Movie[] = [];
  titles = [];
  titleRequests = [];

  getMovies(query?: string) {
    if(!query) {
      console.log('pas de query');
      const keywords = ['men', 'black', 'love', 'house', 'tiny', 'story', 'manhattan'];
      const apiRequests = [];
      for(let i = 0; i < keywords.length; i++) {
        apiRequests.push(this.http.get(this.getMovieUrlT(keywords[i])));
      }
      return forkJoin(apiRequests);
    } else {
      console.log('est rentre dans le else');
      return this.http.get<Movie[]>(this.getMovieUrlS(query));
    }

  }

  getMoviesWithInfo(query: string) {

    this.getMovies(query).subscribe((movies: Movie[]) => {
      this.movieService.setMovies(toCamel(movies)["search"]);
    })
    this.movieService.moviesChanged.subscribe(
      (movies: Movie[]) => {
        this.movies = movies;
      }
    );
    for(let i = 0; i < this.movies.length; i++) {
      this.titles.push(this.movies[i]['title']);
    }
    console.log(this.titles);
    for(let i = 0; i < this.titles.length; i++) {
      this.titleRequests.push(this.http.get(this.getMovieUrlT(this.titles[i])));
    }
    return forkJoin(this.titleRequests);
  }

  fetchMoviesWithInfo(query: string) {
    this.getMoviesWithInfo(query).subscribe(
      (movies: Movie[]) => {
        this.movieService.setMovies(toCamel(movies))
      })
  }

  fetchMovies(query?: string) {
    this.getMovies(query).subscribe(
          (movies: Movie[]) => {
            this.movieService.setMovies(toCamel(movies))
            console.log(movies);
            console.log(movies.length)
          }
        );

  }

  //fetchSearchResults(query) {
    //this.getMovies(query).subscribe((movies: Movie[]) => {
      //console.log(movies["Search"])
      //if(movies["Response"] === "True") {
        //this.movieService.setMovies(toCamel(movies)["search"]);
      //} else {
        //this.movieService.setMovies([]);
      //}
    //})
  //}

  private getMovieUrlT(query: string): string {
    return `https://www.omdbapi.com/?t=${query}&apikey=6d4e8e6`;
  }
  private getMovieUrlS(query: string): string {
    return `https://www.omdbapi.com/?type=movie&s=${query}&apikey=ad37881b`;
  }
}
