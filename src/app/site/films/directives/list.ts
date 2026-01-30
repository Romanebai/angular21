import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[movieList]',
})
export class ListDirective {
  constructor(private el: ElementRef) {}

  @Input()
  set movieList(movies: any) {
    this.renderMovieList(movies); 
  }

  private renderMovieList(movies: any[]): void {
    let temp = `<div class="movie-list-container">`;

    movies.forEach((movie: any) => {
      temp += `
        <div class="movie-card">
          <h3>${movie.Title} (${movie.Year})</h3>
          <img src="${movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=Pas+d\'affiche'}"
               alt="Affiche de ${movie.Title}"
               class="movie-poster">
               
          <div class="movie-details">
            <p><strong>Réalisateur :</strong> ${movie.Director || 'Inconnu'}</p>
            <p><strong>Acteurs :</strong> ${movie.Actors || 'Inconnu'}</p>
            <p><strong>Genre :</strong> ${movie.Genre || 'Inconnu'}</p>
            <p><strong>Note :</strong> ${movie.imdbRating ? movie.imdbRating + '/10' : 'Non disponible'}</p>
            <p class="movie-plot"><strong>Résumé :</strong> ${movie.Plot || 'Non disponible'}</p>
          </div>
        </div>
      `;
    });

    temp += `</div>`;
    this.el.nativeElement.innerHTML = temp;
  }
}