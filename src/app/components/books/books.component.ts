import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { IBook } from '../../models/book.type';
import { HttpGotService } from '../../services/http-got.service'
import { MatDialog } from '@angular/material/dialog';
import { BookDialogComponent } from '../book-dialog/book-dialog.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  public name: string = '';

  public books: IBook[] = [];

  pageEvent: PageEvent | void | undefined;

  // Pagination
  length: number = 0;
  pageIndex: number = 1;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  

  constructor(private _httpGotService: HttpGotService, 
    public loaderService: LoaderService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this._httpGotService.getBooks().subscribe(data => this.books = data);
  }

  /**
   * Opens dialog
   * pass data to dialog
   * @param book 
   */
  openDialog(book: IBook): void {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      data: book,
      height:'92%',
      width: '80%',
    });     
  }


  /**
   * Determines whether paginate changes and move to next mpage
   * @param event 
   */
  onPaginateChange(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

}
