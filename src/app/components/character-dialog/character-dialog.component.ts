import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpGotService } from 'src/app/services/http-got.service';
import { lastValueFrom, Observable, } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-character-dialog',
  templateUrl: './character-dialog.component.html',
  styleUrls: ['./character-dialog.component.scss']
})
export class CharacterDialogComponent implements OnInit {

  public father: any | undefined = '';
  public mother: any | undefined = '';
  public spouse: any | undefined = '';
  public id!: number;
  public books: any[] | undefined = [];
  public povBooks: any[] | undefined = []
  public allegiances: any[] | undefined = [];

  constructor(@Inject(MAT_DIALOG_DATA) public character: any,
    private _httpGotService: HttpGotService,
    public loaderService: LoaderService) { }

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
   * async funtion
   * Gets character data
   * get all entities data inside the character entity
   */
  async getCharacterData() {
    this.id = parseInt(this.getId(this.character.url));
    if (this.id) {
      if (this.character.father) {
        const father$ = this.GetResourceFromUrl(this.character.father);
        this.father = await lastValueFrom(father$);
        console.log("fathe", this.father.name);
      }
      if (this.character.mother) {
        const mother$ = this.GetResourceFromUrl(this.character.mother);
        this.mother = await lastValueFrom(mother$);
        console.log("mother", this.mother);
      }
      if (this.character.spouse) {
        const spouse$ = this.GetResourceFromUrl(this.character.spouse);
        this.spouse = await lastValueFrom(spouse$);
        console.log("spse", this.spouse);
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
