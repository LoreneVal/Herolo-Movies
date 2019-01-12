import { Component, OnInit } from '@angular/core';
import { Movie } from './movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  constructor(){}
  movies: Movie[] = [
    new Movie(
      'Crazy, Stupid, Love.',
      2011,
      125,
      "Drama",
      "John Requa",
      "https://m.media-amazon.com/images/M/MV5BMTg2MjkwMTM0NF5BMl5BanBnXkFtZTcwMzc4NDg2NQ@@._V1_SX300.jpg"
    ),
    new Movie(
      'Love Actually',
      2003,
      130,
      "Romance",
      "Richard Curtis",
      "https://m.media-amazon.com/images/M/MV5BMTY4NjQ5NDc0Nl5BMl5BanBnXkFtZTYwNjk5NDM3._V1_SX300.jpg"
    )
  ];

  ngOnInit() {
  }


}
