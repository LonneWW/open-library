import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryContainerComponent } from './library-container.component';
import { provideHttpClient } from '@angular/common/http';

describe('LibraryContainerComponent', () => {
  let component: LibraryContainerComponent;
  let fixture: ComponentFixture<LibraryContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryContainerComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(LibraryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
