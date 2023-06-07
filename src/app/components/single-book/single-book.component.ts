import { Component, OnInit, Inject } from '@angular/core';
import { HttpGotService } from 'src/app/services/http-got.service';
import { lastValueFrom, Observable, } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

  public book!: any;
  public characters: any[] | undefined;
  public povCharacters: any[] | undefined;
  public id: string | null = '';

  constructor(private _httpGotService: HttpGotService,
    public loaderService: LoaderService,
    private route: ActivatedRoute) { }

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
   * get all resources data in the character entity
   */
  async getCharacters() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this._httpGotService.getBookById(parseInt(this.id)).subscribe(async book => {
        this.book = book
        if (this.book.characters && this.book.characters.length > 0) {
          const characters$ = this.GetResourcesFromUrls(this.book.characters);
          this.characters = await lastValueFrom(characters$);
        }
        if (this.book.povCharacters && this.book.povCharacters.length > 0) {
          const povCharacters$ = this.GetResourcesFromUrls(this.book.povCharacters);
          this.povCharacters = await lastValueFrom(povCharacters$);

        }
        this.loading = false;
      })
    }
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
