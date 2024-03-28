import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string,any>();

  addDataToCache(url:string,data:any){
    this.cache.set(url,data)
  }

  getCachedData(url:string){
    return this.cache.get(url)
  }
}
