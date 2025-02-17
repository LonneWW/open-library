import { Routes } from '@angular/router';
import { LibraryContainerComponent } from './components/library-container/library-container.component';
import { AppComponent } from './app.component';
export const routes: Routes = [
  {
    path: '',
    children: [{ path: 'books', component: LibraryContainerComponent }],
  },
];
