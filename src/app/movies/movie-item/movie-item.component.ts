import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../movie.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css'],
  providers: [MatCardModule]
})
export class MovieItemComponent implements OnInit {
  @Input() movie: Movie;
  constructor() { }

  ngOnInit() {
  }

}
