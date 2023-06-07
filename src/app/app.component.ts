import { Component, OnInit } from '@angular/core';
import { IBook } from './models/book.type';
import { HttpGotService } from './services/http-got.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public books: IBook[] = [];

  constructor(private _httpGotService: HttpGotService) { }

  ngOnInit(): void {
    this._httpGotService.getBooks().subscribe(data => this.books = data);
  }
}
