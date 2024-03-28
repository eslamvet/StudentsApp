import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent {
  @Input({
    required:true,
    transform:(length:number)=>Array.from({length},(_,i)=>i+1)
  }) totalPages!:number[]

  @Output() paginate = new EventEmitter<number>()

  @Input({required:true}) currentPage!:number

  goToPage(page:number){
    this.paginate.emit(page)
  }
}
