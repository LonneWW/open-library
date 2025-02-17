import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { PaginatorComponent } from './paginator/paginator.component';
import { BooksListComponent } from './books-list/books-list.component';
import { BookDescriptionComponent } from './book-description/book-description.component';
import { LibraryDataService } from '../../services/library-data.service';
import { BookDetails } from '../../models/book-details';
@Component({
  selector: 'app-library-container',
  imports: [
    CommonModule,
    PaginatorComponent,
    BooksListComponent,
    BookDescriptionComponent,
  ],
  templateUrl: './library-container.component.html',
  styleUrl: './library-container.component.scss',
})
export class LibraryContainerComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  protected bookDetails: string = '';
  protected showDialog: boolean = false;
  protected animationToggle: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();
  constructor(private libraryService: LibraryDataService) {}
  displayDescription(e: string) {
    this.showDialog = true;
    this.libraryService.getBookDescription(e);
  }

  closeDialog() {
    this.showDialog = false;
    this.bookDetails = '';
  }
  ngOnInit(): void {
    this.libraryService.bookDetails$
      .pipe(takeUntil(this.destroy$))
      .subscribe((r) => {
        let response = r as
          | BookDetails
          | { description: string }
          | { description: { key: string; value: string } };
        if (response.description) {
          if (typeof response.description === 'string') {
            this.bookDetails = response.description.replace(/\n/g, '<br>');
          }
          if (
            typeof response.description === 'object' &&
            'value' in response.description
          ) {
            this.bookDetails = response.description.value
              ? response.description.value.replace(/\n/g, '<br>')
              : 'Description not provided...';
          }
        } else {
          this.bookDetails = 'Description not provided...';
        }
      });
  }

  ngAfterViewInit(): void {
    this.animationToggle = true;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
