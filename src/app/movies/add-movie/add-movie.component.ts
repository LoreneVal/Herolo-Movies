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
  //editMode = false;
  movieForm: FormGroup;
  errorForm = new FormControl;

  constructor(private modalService: NgbModal, private movieService: MovieService) {}

  ngOnInit() {
    this.movieForm = new FormGroup({
      'imdbID': new FormControl(this.movieService.generateId()),
      'title': new FormControl(null, Validators.required),
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
  }

  onSubmit() {
    this.movieService.addMovie(this.movieForm.value);
    console.log(this.movieService.movies)
  }
  closeResult: string;

  getErrorMessage() {
    if(!this.movieForm.get('title').valid) {
      return 'Please enter a title';
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
