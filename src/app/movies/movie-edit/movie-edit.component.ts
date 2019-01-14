import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';


@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {

  //editMode = false;
  movieForm: FormGroup;
  index: number;
  @Input() movie: Movie

  constructor(private modalService: NgbModal, private movieService: MovieService) {}

  ngOnInit() {

  }

  onSubmit() {
    this.index = this.movieService.findIndexByID(this.movie.imdbID);
    this.movieService.updateMovie(this.index, this.movieForm.value);
    console.log(this.index);
    console.log(this.movieService.movies)
  }
  closeResult: string;

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.movieForm = new FormGroup({
      'imdbID': new FormControl(this.movie.imdbID),
      'title': new FormControl(this.movie.title, Validators.required),
      'year': new FormControl(this.movie.year),
      'runtime': new FormControl(this.movie.runtime),
      'genre': new FormControl(this.movie.genre),
      'director': new FormControl(this.movie.director),
      'poster': new FormControl(this.movie.poster)
    });

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
