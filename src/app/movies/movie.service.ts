import { Movie } from './movie.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MovieService {
  movies: Movie[] = [];
  moviesChanged = new Subject<Movie[]>();

  setMovies(movies: Movie[]) {
    this.movies = movies;
    this.moviesChanged.next(this.movies);
  }

  seeMovies() {
    return this.movies;
  }

  getLastId() {
    return this.movies.length;
  }

  addMovie(movie: Movie) {
    this.movies.push(movie);
    this.moviesChanged.next(this.movies);
  }

  findIndexByID(imdbID: string) {
    for(let i = 0; i < this.movies.length; i++) {
      if(this.movies[i].imdbID == imdbID) {
        return i
      }
    }
  }

  updateMovie(index: number, newMovie: Movie) {
    this.movies[index] = newMovie;
    this.moviesChanged.next(this.movies);
  }

  deleteMovie(index: number) {
    this.movies.splice(index, 1);
    this.moviesChanged.next(this.movies);
  }


  generateId(): string {
    let text = '';
    const idNumbers = '123456789';

    for (let i = 0; i < 5; i++) {
      text += idNumbers.charAt(Math.floor(Math.random() * idNumbers.length));
    }
    return text;
  }

}
