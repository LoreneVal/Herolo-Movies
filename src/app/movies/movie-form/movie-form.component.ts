import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {
  movieForm: FormGroup;
  @Input() movie: Movie;

  constructor() { }



  ngOnInit() {
    this.movieForm = new FormGroup({
      'imdbID': new FormControl({value: this.movie.imdbID, disabled: true}),
      'title': new FormControl(this.movie.title, Validators.required),
      'year': new FormControl(this.movie.year),
      'runtime': new FormControl(this.movie.runtime),
      'genre': new FormControl(this.movie.genre),
      'director': new FormControl(this.movie.director),
      'poster': new FormControl(this.movie.poster)
    });
  }

}
