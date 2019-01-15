import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  addMovieForm: FormGroup;
  errorForm = new FormControl;

  constructor(private modalService: NgbModal, private movieService: MovieService) {}

  ngOnInit() {
    this.addMovieForm = new FormGroup({
      'imdbID': new FormControl(this.movieService.generateId()),
      'title': new FormControl(null, [Validators.required, this.isExistingTitle.bind(this)]),
      'year': new FormControl(null, [
                                Validators.required,
                                Validators.max(2019),
                                Validators.pattern('[0-9]{4}')
                              ]),
      'runtime': new FormControl(null, Validators.required),
      'genre': new FormControl(null, Validators.required),
      'director': new FormControl(null, Validators.required),
      'poster': new FormControl(null)
    });

    this.addMovieForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
  }

  onSubmit() {
    this.movieService.addMovie(this.addMovieForm.value);
    this.ngOnInit();
  }
  closeResult: string;

  getErrorMessage() {
    if(!this.addMovieForm.get('title').valid) {
      if(this.addMovieForm.get('title').errors['required']) {
        return 'Please enter a title';
      } else {
        return 'This movie already exists, please enter another title';
      }
    }
    if(!this.addMovieForm.get('year').valid) {
      if(this.addMovieForm.get('year').value > 2019) {
        return 'please enter a year previous to 2019'
      } else {
        return 'Please enter a valid year (yyyy)';
      }
    }
    if(!this.addMovieForm.get('runtime').valid) {
      return'Please enter a runtime';
    }
    if(!this.addMovieForm.get('genre').valid) {
      return 'Please select a genre';
    }
    if(!this.addMovieForm.get('director').valid) {
      return 'Please enter a director';
    }

  }
  isExistingTitle(control: FormControl): {[s: string]: boolean} {
    console.log(control.value != null)
    if(control.value != null) {
      for(let i = 0; i < this.movieService.movies.length; i++) {
        if(control.value.toUpperCase() == this.movieService.movies[i]['title'].toUpperCase()) {
          return {existingTitle: true};
        }
    }
  }
  return null;
  }

  openErr(errorpopup) {
    this.modalService.open(errorpopup, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  open(addcontent) {
    this.modalService.open(addcontent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
