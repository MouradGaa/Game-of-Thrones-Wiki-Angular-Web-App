import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICharacter } from 'src/app/models/character.type';
import { HttpGotService } from 'src/app/services/http-got.service';
import { lastValueFrom, Observable, } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.scss']
})
export class BookDialogComponent implements OnInit {

  public characters: any[] | undefined;
  public povCharacters: any[] | undefined;

  public id!: number;

  public character!: ICharacter;

  constructor(@Inject(MAT_DIALOG_DATA) public book: any,
    private _httpGotService: HttpGotService,
    public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.getCharacters()
  }

  /**
   * To date
   * @param date 
   * @returns date 
   */
  ToDate(date: string): string {
    return new Date(date).toUTCString()
  }

  /**
   * Gets id
   * @param url 
   * @returns id 
   */
  getId(url: string): string {
    var n = url.lastIndexOf('/');
    return url.substring(n + 1);
  }

  loading = true;


  /**
   * async function
   * Gets characters
   * get entites data in the character entiry 
   */
  async getCharacters() {
    this.id = parseInt(this.getId(this.book.url));
    if (this.id) {
      if (this.book.characters && this.book.characters.length > 0) {
        const characters$ = this.GetResourcesFromUrls(this.book.characters);
        this.characters = await lastValueFrom(characters$);
      }
      if (this.book.povCharacters && this.book.povCharacters.length > 0) {
        const povCharacters$ = this.GetResourcesFromUrls(this.book.povCharacters);
        this.povCharacters = await lastValueFrom(povCharacters$);

      }
    }
    this.loading = false;
  }

  /**
   * Gets resource from url
   * @param url 
   * @returns resource from url 
   */
  GetResourceFromUrl(url: string): Observable<any> {
    return this._httpGotService.GetResourceFromUrl(url);
  }

  /**
   * Gets resources from urls
   * @param urls 
   * @returns resources from urls 
   */
  GetResourcesFromUrls(urls: string[]): Observable<any[]> {
    return this._httpGotService.GetResourcesFromUrls(urls);
  }

}
