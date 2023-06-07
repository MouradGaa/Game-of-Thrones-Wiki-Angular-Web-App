import { Component, OnInit } from '@angular/core';
import { HttpGotService } from 'src/app/services/http-got.service';
import { lastValueFrom, Observable, } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-character',
  templateUrl: './single-character.component.html',
  styleUrls: ['./single-character.component.scss']
})
export class SingleCharacterComponent implements OnInit {

  public father: any | undefined = '';
  public mother: any | undefined = '';
  public spouse: any | undefined = '';
  public id: string | null = '';
  public books: any[] | undefined = [];
  public povBooks: any[] | undefined = []
  public allegiances: any[] | undefined = [];

  public character!: any;

  constructor(private _httpGotService: HttpGotService,
    public loaderService: LoaderService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCharacterData()
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
   * Async function
   * Gets character data
   * get all entites data in the characer entity
   */
  async getCharacterData() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this._httpGotService.getCharacterById(parseInt(this.id)).subscribe(async character => {
        this.character = character;
        if (this.character.father) {
          const father$ = this.GetResourceFromUrl(this.character.father);
          this.father = await lastValueFrom(father$);
        }
        if (this.character.mother) {
          const mother$ = this.GetResourceFromUrl(this.character.mother);
          this.mother = await lastValueFrom(mother$);
        }
        if (this.character.spouse) {
          const spouse$ = this.GetResourceFromUrl(this.character.spouse);
          this.spouse = await lastValueFrom(spouse$);
        }

        if (this.character.books && this.character.books.length > 0) {
          const books$ = this.GetResourcesFromUrls(this.character.books);
          this.books = await lastValueFrom(books$);
          console.log(this.books);
        }
        if (this.character.povBooks && this.character.povBooks.length > 0) {
          const povBooks$ = this.GetResourcesFromUrls(this.character.povBooks);
          this.povBooks = await lastValueFrom(povBooks$);
        }
        if (this.character.allegiances && this.character.allegiances.length > 0) {
          const allegiances$ = this.GetResourcesFromUrls(this.character.allegiances);
          this.allegiances = await lastValueFrom(allegiances$);
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
