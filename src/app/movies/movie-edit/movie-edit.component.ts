import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {

  errorForm = new FormControl;
  movieForm: FormGroup;
  index: number;
  @Input() movie: Movie;

  constructor(private modalService: NgbModal, private movieService: MovieService) {}

  ngOnInit() {
    this.movieForm = new FormGroup({
      'imdbID': new FormControl(this.movie.imdbID),
      'title': new FormControl(this.movie.title, [Validators.required, this.isExistingTitle.bind(this)]),
      'year': new FormControl(this.movie.year, [
                                Validators.required,
                                Validators.max(2019),
                                Validators.pattern('[0-9]{4}')]),
      'runtime': new FormControl(this.movie.runtime, Validators.required),
      'genre': new FormControl(this.movie.genre, Validators.required),
      'director': new FormControl(this.movie.director, Validators.required),
      'poster': new FormControl(this.movie.poster)
    });

    this.movieForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
  }

  onSubmit() {
    this.index = this.movieService.findIndexByID(this.movie.imdbID);
    this.movieService.updateMovie(this.index, this.movieForm.value);
    this.ngOnInit();
  }
  closeResult: string;


getErrorMessage() {
  if(!this.movieForm.get('title').valid) {
    if(this.movieForm.get('title').errors['required']) {
      return 'Please enter a title';
    } else {
      return 'This movie already exists, please enter another title';
    }
  }
  if(!this.movieForm.get('year').valid) {
    if(this.movieForm.get('year').value > 2019) {
      return 'please enter a year previous to 2019'
    } else {
      return 'Please enter a valid year (yyyy)';
    }
  }
  if(!this.movieForm.get('runtime').valid) {
    return'Please enter a runtime';
  }
  if(!this.movieForm.get('genre').valid) {
    return 'Please select a genre';
  }
  if(!this.movieForm.get('director').valid) {
    return 'Please enter a director';
  }
}
  //Custom validator for existing title error
isExistingTitle(control: FormControl): {[s: string]: boolean} {

    for(let i = 0; i < this.movieService.movies.length; i++) {
      if(control.value.toUpperCase().replace(/\s+/g, '').replace(/[^\w\s]/gi, '') == this.movieService.movies[i]['title'].toUpperCase().replace(/\s+/g, '').replace(/[^\w\s]/gi, '')) {
        return {existingTitle: true};
      }
    }

  return null;
}
  //modal for error popup message
  openErr(errorpopup) {
    this.modalService.open(errorpopup, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
