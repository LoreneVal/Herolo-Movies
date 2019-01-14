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
  error: any;
  movies: Movie[] = [];


  getMovies(query?: string) {

    return this.http.get<Movie[]>(this.getMovieUrlS(query));

  }

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
