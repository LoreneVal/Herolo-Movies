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

  constructor(private modalService: NgbModal, private movieService: MovieService) {}

  ngOnInit() {

  }

  onSubmit() {
    this.movieService.addMovie(this.movieForm.value);
  }
  closeResult: string;

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.movieForm = new FormGroup({
      'imdbID': new FormControl({value: this.movieService.generateId(), disabled: true}),
      'title': new FormControl(null, Validators.required),
      'year': new FormControl(null),
      'runtime': new FormControl(null),
      'genre': new FormControl(null),
      'director': new FormControl(null),
      'poster': new FormControl(null)
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
