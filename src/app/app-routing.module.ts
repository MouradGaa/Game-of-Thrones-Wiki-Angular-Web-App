import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './components/books/books.component';
import { CharactersComponent } from './components/characters/characters.component';
import { HousesComponent } from './components/houses/houses.component';
import { HomeComponent } from './components/home/home.component';
import { SingleHouseComponent } from './components/single-house/single-house.component';
import { SingleCharacterComponent } from './components/single-character/single-character.component';
import { SingleBookComponent } from './components/single-book/single-book.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'books', component: BooksComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'houses', component: HousesComponent },
  { path: 'houses/:id', component: SingleHouseComponent },
  { path: 'characters/:id', component: SingleCharacterComponent },
  { path: 'books/:id', component: SingleBookComponent },
  { path: "**", redirectTo: "/home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
