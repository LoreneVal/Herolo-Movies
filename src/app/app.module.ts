import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieItemComponent } from './movies/movie-item/movie-item.component';
import { MovieEditComponent } from './movies/movie-edit/movie-edit.component';
import { AddMovieComponent } from './movies/add-movie/add-movie.component';

import { MovieService } from './movies/movie.service';
import { DataStorageService } from './shared/data-storage.service';
import { DeleteMovieComponent } from './movies/delete-movie/delete-movie.component';
import { MovieTitlePipe } from './movies/movie-title.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieItemComponent,
    MovieEditComponent,
    AddMovieComponent,
    DeleteMovieComponent,
    MovieTitlePipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [MovieService, DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
