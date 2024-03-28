import { Component, Input, OnInit, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [],
  providers:[UsersService],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.scss'
})
export class StudentDetailsComponent implements OnInit {
  @Input() id!:number
  userSer = inject(UsersService)
  user!:User
  error=''
  ngOnInit(): void {
    this.userSer.getUserById(this.id).subscribe({
      next:res=>{
        this.user = res.data
      },
      error:err=>{
        this.error = err.message
      }
    })
  }
}
