import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, tap, throwError } from 'rxjs';
import { CacheService } from '../services/cache.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const cache = inject(CacheService);

  const modifiedReq = req.clone({
    url:req.url.startsWith('/api') ? "https://reqres.in"+req.url : req.url
  })

  if(modifiedReq.method == 'GET' && cache.getCachedData(modifiedReq.urlWithParams)){
    return of(cache.getCachedData(modifiedReq.urlWithParams))
  }

  return next(modifiedReq).pipe(tap({
    next:data=>{
      cache.addDataToCache(modifiedReq.urlWithParams,data)
    }
  }),catchError((error)=>throwError(()=>{
    return new Error(error.message)
  })));
};
