import { SearchTextService } from './../../services/search-text.service';
import { Component, OnInit, inject } from '@angular/core';
import { UsersService, usersRes } from '../../services/users.service';
import { User } from '../../interfaces/user';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { Observer, catchError, iif, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserCardComponent,PaginatorComponent],
  providers:[UsersService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  userSer = inject(UsersService)
  searchTextObs$=inject(SearchTextService).searchTextObs$
  users!:User[]|null
  totalPages!:number
  currentPage=1
  error=''
  ngOnInit(): void {
    this.getUsers(1)
    this.searchTextObs$.pipe(switchMap(id=>{
      if(!id) return this.userSer.getUsersByPage(1)
      else{
        const user = this.users?.find(u=>u.id == id) as User
        return iif(()=>!!user,of({data:user,message:''}),this.userSer.getUserById(id).pipe(catchError((err) => of({data:{} as User,message:err.message.includes('404') ? 'There is no user with this id' : err.message})))).pipe(map(res=>({data:[res.data],total_pages:1,page:1,message:res.message})))
      }
    })).subscribe(this.getUsersSubscribeHandler())
  }

  getUsers(page:number){
    this.userSer.getUsersByPage(page).subscribe(this.getUsersSubscribeHandler())
  }

  getUsersSubscribeHandler() : Partial<Observer<usersRes>>{
    return {
      next:res=>{
        if(!res.message){
          if(this.error) this.error = ''
          this.users = res.data
          this.totalPages = res.total_pages
          this.currentPage = res.page
        }else{
          this.error = res.message;
          if(this.users) this.users = null
        }
      },
      error:err=>{
        this.error = err.message
        if(this.users) this.users = null
      }
    }
  }


}
