import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpGotService } from './services/http-got.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { NavbarComponent } from './components/navbar/navbar.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BooksComponent } from './components/books/books.component';
import { CharactersComponent } from './components/characters/characters.component';
import { HousesComponent } from './components/houses/houses.component';
import { HomeComponent } from './components/home/home.component';
import { InterceptorService } from './services/loader/interceptor.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { BookDialogComponent } from './components/book-dialog/book-dialog.component';
import { CharacterDialogComponent } from './components/character-dialog/character-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HouseDialogComponent } from './components/house-dialog/house-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatListModule} from '@angular/material/list';
import {MatTreeModule} from '@angular/material/tree';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { SingleBookComponent } from './components/single-book/single-book.component';
import { SingleCharacterComponent } from './components/single-character/single-character.component';
import { SingleHouseComponent } from './components/single-house/single-house.component';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BooksComponent,
    CharactersComponent,
    HousesComponent,
    HomeComponent,
    BookDialogComponent,
    CharacterDialogComponent,
    HouseDialogComponent,
    SingleBookComponent,
    SingleCharacterComponent,
    SingleHouseComponent
  ],
  entryComponents: [BookDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatGridListModule,
    FlexLayoutModule,
    MatDialogModule,
    MatPaginatorModule,
    MatInputModule,
    CarouselModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    FormsModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatListModule,
    MatTreeModule,
    MatProgressBarModule,
    RouterModule
  ],
  providers: [
    HttpGotService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
