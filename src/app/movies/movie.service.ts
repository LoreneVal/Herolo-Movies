import { Movie } from './movie.model';
import { Injectable } from '@angular/core';

@Injectable()
export class MovieService {
  //movieChanged = new Subject<Movie[]>();
    movies: Movie[] = [
    new Movie(
      1,
      'Crazy, Stupid, Love.',
      2011,
      125,
      "Drama",
      "John Requa",
      "https://m.media-amazon.com/images/M/MV5BMTg2MjkwMTM0NF5BMl5BanBnXkFtZTcwMzc4NDg2NQ@@._V1_SX300.jpg"
    ),
    new Movie(
      2,
      'Love Actually',
      2003,
      130,
      "Romance",
      "Richard Curtis",
      "https://m.media-amazon.com/images/M/MV5BMTY4NjQ5NDc0Nl5BMl5BanBnXkFtZTYwNjk5NDM3._V1_SX300.jpg"
    )
  ];

  getMovies() {
    return this.movies;
  }

  getLastId() {
    return this.movies.length;
  }

  addMovie(movie: Movie) {
    this.movies.push(movie);
    //this.movieChanged.next(this.movies.slice());
  }
}
