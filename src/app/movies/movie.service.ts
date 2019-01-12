import { Movie } from './movie.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Injectable()
export class MovieService {
  movies: Movie[] = [];

  constructor(private http: HttpClient){}
  //movieChanged = new Subject<Movie[]>();
    //movies: Movie[] = [
    //new Movie(
      //1,
      //'Crazy, Stupid, Love.',
      //2011,
      //125,
      //"Drama",
      //"John Requa",
      //"https://m.media-amazon.com/images/M/MV5BMTg2MjkwMTM0NF5BMl5BanBnXkFtZTcwMzc4NDg2NQ@@._V1_SX300.jpg"
    //),
    //new Movie(
      //2,
      //'Love Actually',
      //2003,
      //130,
      //"Romance",
      //"Richard Curtis",
      //"https://m.media-amazon.com/images/M/MV5BMTY4NjQ5NDc0Nl5BMl5BanBnXkFtZTYwNjk5NDM3._V1_SX300.jpg"
    //)
  //];

  getMovies(query?: string) {
    if(!query) {
      const keywords = ['men', 'black', 'love', 'house', 'tiny', 'story', 'manhattan'];
      const apiRequests = [];
      for(let i = 0; i < keywords.length; i++) {
        apiRequests.push(this.http.get(this.getMovieUrl(keywords[i])));
      }
      return forkJoin(apiRequests);
    } else {
      return this.http.get<Movie[]>(this.getMovieUrl(query));
    }
    //return this.movies;
  }

  getLastId() {
    return this.movies.length;
  }

  addMovie(movie: Movie) {
    this.movies.push(movie);
    //this.movieChanged.next(this.movies.slice());
  }

  generateId(): string {
    let text = '';
    const idNumbers = '123456789';

    for (let i = 0; i < 5; i++) {
      text += idNumbers.charAt(Math.floor(Math.random() * idNumbers.length));
    }
    return text;
  }

  private getMovieUrl(query: string): string {
    return `http://www.omdbapi.com/?t=${query}&apikey=6d4e8e6`;
  }
}
