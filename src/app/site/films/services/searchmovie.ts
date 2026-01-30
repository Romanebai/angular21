import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Searchmovie {
  private apiKey = 'b267f2ad';

  constructor(private http: HttpClient) {}

  search(action: (movies: any[]) => void, title: string, year: number = 0): void {
    const y = year ? `&y=${year}` : '';
    this.http
      .get<any>(`http://www.omdbapi.com/?apikey=${this.apiKey}&s=${title}${y}`)
      .subscribe(res => {
        if (res.Response === 'True' && res.Search) {
          // Crée un tableau d'observables pour récupérer les détails
          const detailRequests: Observable<any>[] = res.Search.map((movie: any) =>
          this.http.get<any>(`http://www.omdbapi.com/?apikey=${this.apiKey}&i=${movie.imdbID}&plot=full`)
          );


          // Lance toutes les requêtes en parallèle
          forkJoin(detailRequests).subscribe((detailedMovies: any[]) => {
            action(detailedMovies); // tous les films avec toutes les infos
          });
        } else {
          action([]);
        }
      });
  }
}
