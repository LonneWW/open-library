import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksListComponent } from './books-list.component';
import { provideHttpClient } from '@angular/common/http';

describe('BooksListComponent', () => {
  let component: BooksListComponent;
  let fixture: ComponentFixture<BooksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksListComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(BooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
