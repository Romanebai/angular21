import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Searchmovie {
  constructor(private http: HttpClient) {}
  search(action: any, title: string, year: number = 0): void {
    let results = {};
    let y = year ? `&y=${year}` : '';
    this.http
      .get(`http://www.omdbapi.com/?apikey=b267f2ad&s=${title}${y}&plot=full`)
      .subscribe((response:any) => {
        if (response.Response === "True" && response.Search) {
      action(response.Search); 
    } else {
      action([]);
    }
  });
}}
