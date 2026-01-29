import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Searchmovie } from '../services/searchmovie';
import { FormValidators } from '../form-validators';
import { ListDirective as movieList } from '../directives/list';

@Component({
  selector: 'app-searchform',
  imports: [ReactiveFormsModule, FormsModule, movieList],
  templateUrl: './searchform.html',
  styleUrl: './searchform.css',
})
export class Searchform implements OnInit {
  searchForm: FormGroup = new FormGroup({});
  title: FormControl = new FormControl({});
  year: FormControl = new FormControl({});
  results: any;
  errors: string = '';
  constructor(
    private fb: FormBuilder,
    private searchMovie: Searchmovie,
  ) {}

  ngOnInit() {
    let titlePattern = '[ a-zA-Z0-9,\.]+';
    let yearPattern = '[0-9]{4}';
    this.title = this.fb.control('', [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern(titlePattern),
    ]);
    this.year = this.fb.control('2018', [
      Validators.pattern(yearPattern),
      FormValidators.integerBetween(1900, 2022),
    ]);
    this.searchForm = this.fb.group({
      title: this.title,
      year: this.year,
    });
  }
  startSearch() {
    const title = this.title.value; 
    const year = this.year.value;
    const that = this;

    if (!title) {
      that.errors = 'Titre non obligatoire !';
      that.results = '';
      return;
    }

    const action = (data: any) => {
      if (!data || (Array.isArray(data) && data.length === 0)) {
        that.errors = 'Aucun résultat !';
        that.results = '';
      } else {
        that.errors = '';
        that.results = data;
      }
    };

    this.searchMovie.search(action, title, year);
  }
}
