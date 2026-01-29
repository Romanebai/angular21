import { Component } from '@angular/core';
import { Searchform } from '../films/searchform/searchform';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-films',
  imports: [Searchform,ReactiveFormsModule,FormsModule],
  templateUrl: './films.html',
  styleUrl: './films.css',
})
export class Films {

}
