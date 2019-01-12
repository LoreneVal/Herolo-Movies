import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { HeaderComponent } from './header/header.component';
import { MovieItemComponent } from './movies/movie-item/movie-item.component';
import { MovieEditComponent } from './movies/movie-edit/movie-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    HeaderComponent,
    MovieItemComponent,
    MovieEditComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
