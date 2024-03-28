import { Injectable } from '@angular/core';
import { Observable, Subject, debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchTextService {
  private searchTextSub$ = new Subject<number>()
  readonly searchTextObs$!:Observable<number>

  constructor() {
    this.searchTextObs$ = this.searchTextSub$.asObservable().pipe(debounceTime(1000))
  }

  setSearchText(text:number){
    this.searchTextSub$.next(text)
  }



}
