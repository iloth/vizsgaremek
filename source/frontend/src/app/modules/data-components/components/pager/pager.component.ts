import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'dc-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {
  constructor() { }

  @Input() 
  itemsCount: number = 0;
  pagesCount: number = 0;

  @Input() 
  pageSize: number = environment.dataComponents.pager.defaultPageSize;
  
  @Input()
  @Output() 
  currPage: number = 1;

  @Input()
  displayPagesCount: number = environment.dataComponents.pager.defaultDisplayPagesCount; 

  @Output() 
  pageChanged: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
  }

  displayPages(): number[] {
    this.pagesCount = Math.ceil(this.itemsCount / this.pageSize);
    let minPage: number = Math.max(1, this.currPage - Math.floor(this.displayPagesCount / 2));
    let maxPage: number = Math.min(this.pagesCount, minPage + this.displayPagesCount - 1);
    if (maxPage === this.pagesCount) {
      minPage = Math.max(maxPage - this.displayPagesCount + 1, 1);
    }

    const range: number[] = [];
    for(let page = minPage; page <= maxPage; page++) {
      range.push(page);
    }
    return range;
  }

  changePage(pageNo: number) {
    if (pageNo >= 1 && pageNo <= this.pagesCount) {
      this.currPage = pageNo;
      this.pageChanged.emit(this.currPage);
    } else {
      throw new Error("Invalid page!");      
    }
  }
}
