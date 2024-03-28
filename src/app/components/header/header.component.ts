import { SearchTextService } from './../../services/search-text.service';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterEvent, RouterModule } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  isMenuOpen = false
  router = inject(Router)
  SearchTextService = inject(SearchTextService)
  routerUrl$ = this.router.events.pipe(filter((e)=> e instanceof NavigationEnd),map((e:any)=>e.url))

  goBack(){
    this.router.navigateByUrl('/',{replaceUrl:true})
  }
}
