import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[movieList]',
})
export class ListDirective {
  constructor(private el: ElementRef) {}

  @Input()
  set movieList(movies: any) {
    let temp = '';

  if (Array.isArray(movies)) {
    movies.forEach(movie => {
      temp += `<a class="list-group-item list-group-item-action">`;
      if (movie.Poster && movie.Poster !== 'N/A') {
        temp += `<img src="${movie.Poster}" alt="${movie.Title}" style="height:80px; margin-right:10px; vertical-align:middle;">`;
      }      
      temp += `Titre : ${movie.Title} Année: ${movie.Year}`;
      temp += `</a>`;
    });
  } else if (movies) {
    temp += `<a class="list-group-item list-group-item-action">`;
    if (movies.Poster && movies.Poster !== 'N/A') {
      temp += `<img src="${movies.Poster}" alt="${movies.Title}" style="height:80px; margin-right:10px; vertical-align:middle;">`;
    }    
    temp += `Titre : ${movies.Title} Année: ${movies.Year}`;
    temp += `</a>`;
  }

  this.el.nativeElement.innerHTML = temp;
  }
}
