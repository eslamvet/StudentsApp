import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSub$ = new Subject()
  readonly loaderObs$ = this.loaderSub$.asObservable()

  setLoading(show:boolean){
    document.documentElement.style.overflow = !show ? 'auto' : 'hidden'
    this.loaderSub$.next(show)
  }


}
