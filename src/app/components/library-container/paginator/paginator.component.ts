import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  PageEvent,
  MatPaginatorModule,
  MatPaginator,
} from '@angular/material/paginator';
import { LibraryDataService } from '../../../services/library-data.service';

@Component({
  selector: 'app-paginator',
  imports: [MatPaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent implements OnInit {
  protected length: number = 50;
  protected pageIndex: number = 0;
  @ViewChild('paginator') paginator!: MatPaginator;
  constructor(private libraryService: LibraryDataService) {}
  /**
   * The function `handlePageEvent` calls the library service method to retrieve books based on the
   * page index provided in the event parameter.
   * @param {PageEvent} e - PageEvent
   */
  handlePageEvent(e: PageEvent) {
    this.libraryService.getBooks(e.pageIndex);
  }
  ngOnInit(): void {
    //this subscription is made to update the page index of the paginator when the query changes
    this.libraryService.totalWorks$.subscribe((r) => {
      this.length = r;
      if (this.libraryService.resetPage) {
        this.paginator.firstPage();
        this.libraryService.resetPage = false;
      }
    });
  }
}
