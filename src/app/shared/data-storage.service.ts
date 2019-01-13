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

  getMovies(query?: string) {
    if(!query) {
      console.log('pas de query');
      const keywords = ['men', 'black', 'love', 'house', 'tiny', 'story', 'manhattan'];
      const apiRequests = [];
      for(let i = 0; i < keywords.length; i++) {
        apiRequests.push(this.http.get(this.getMovieUrlWithoutQuery(keywords[i])));
      }
      return forkJoin(apiRequests);
    } else {
      console.log('est rentre dans le else');
      return this.http.get<Movie[]>(this.getMovieUrlWithoutQuery(query));
    }

  }

  fetchMovies(query?: string) {
    this.getMovies(query).subscribe(
          (movies: Movie[]) => {
            this.movieService.setMovies(toCamel(movies))
          }
        );
  }

  fetchSearchResults(query) {
    this.getMovies(query).subscribe((movies: Movie[]) => {
      if(movies["Response"] === "True") {
        this.movieService.setMovies(toCamel(movies));
      } else {
        this.movieService.setMovies([]);
        this.error = '0 results found';
      }
    })
  }

  private getMovieUrlWithoutQuery(query: string): string {
    return `https://www.omdbapi.com/?t=${query}&apikey=6d4e8e6`;
  }
  private getMovieUrlWithQuery(query: string): string {
    return `https://www.omdbapi.com/?type=movie&s=${query}&apikey=ad37881b`;
  }
}
