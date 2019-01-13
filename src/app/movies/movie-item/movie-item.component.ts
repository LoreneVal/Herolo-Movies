import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {
  @Input() movie: Movie;
  index: number;
  constructor(private movieService: MovieService) { }

  ngOnInit() {
  }

  onDelete() {
    console.log(this.movieService.seeMovies())
    this.index = this.movieService.findIndexByID(this.movie.imdbID);
    this.movieService.deleteMovie(this.index);
  }

}
