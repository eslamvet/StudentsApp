import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/user';
import { LoaderService } from './loader.service';
import { finalize } from 'rxjs';

export interface usersRes{
  page:number
  total_pages:number
  data:User[]
  message?:string
}

@Injectable()

export class UsersService {
  http = inject(HttpClient)
  loaderService = inject(LoaderService)

  getUsersByPage(page:number){
    this.loaderService.setLoading(true)
    return this.http.get<usersRes>('/api/users',{params:{page}}).pipe(finalize(()=>this.loaderService.setLoading(false)))
  }

  getUserById(id:number){
    this.loaderService.setLoading(true)
    return this.http.get<{data:User,message?:string}>(`/api/users/${id}`).pipe(finalize(()=>this.loaderService.setLoading(false)))
  }

}
