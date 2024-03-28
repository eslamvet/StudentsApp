import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../../interfaces/user';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  @Input({required:true}) user!:User
}
