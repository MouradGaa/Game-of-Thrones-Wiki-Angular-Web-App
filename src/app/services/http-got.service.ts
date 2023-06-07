import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { IBook } from '../models/book.type';
import { ICharacter } from '../models/character.type';
import { IHouse } from '../models/house.type';

@Injectable({
  providedIn: 'root'
})
export class HttpGotService {


  // base endpoint
  public ENDPOINT = "https://www.anapioficeandfire.com/api";

  constructor(private http: HttpClient) { }

  httpOptions = {
    Headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  /**
   * Gets books
   * @returns books 
   */
  public getBooks(): Observable<IBook[]> {
    let response = this.http.get<IBook[]>(this.ENDPOINT + '/books?page=1&pageSize=30');
    return response
  }

  /**
   * Gets book by id
   * @param id 
   * @returns book by id 
   */
  public getBookById(id: number): Observable<IBook> {
    let response = this.http.get<IBook>(this.ENDPOINT + '/books/' + id);
    return response;
  }

  /**
   * Gets characters
   * @param startIndex 
   * @param pageSize 
   * @returns characters 
   */
  public getCharacters(startIndex: number, pageSize: number): Observable<HttpResponse<ICharacter[]>> {
    let response = this.http.get<ICharacter[]>(this.ENDPOINT + '/characters?page=' + startIndex + '&pageSize=' + pageSize, { observe: 'response' });
    return response;
  }

  /**
   * Gets character by url
   * @param url 
   * @returns character by url 
   */
  public getCharacterByUrl(url: string): Observable<ICharacter> {
    let response = this.http.get<ICharacter>(url);
    return response;
  }

  /**
   * Gets character by id
   * @param id 
   * @returns character by id 
   */
  public getCharacterById(id: number): Observable<ICharacter> {
    let response = this.http.get<ICharacter>(this.ENDPOINT + '/characters/' + id);
    return response;
  }

  /**
   * Gets houses
   * @param startIndex 
   * @param pageSize 
   * @returns houses 
   */
  public getHouses(startIndex: number, pageSize: number): Observable<IHouse[]> {
    let response = this.http.get<IHouse[]>(this.ENDPOINT + '/houses?page=' + startIndex + '&pageSize=' + pageSize);
    return response;
  }

  /**
   * Gets house by id
   * @param id 
   * @returns house by id 
   */
  public getHouseById(id: number): Observable<IHouse> {
    let response = this.http.get<IHouse>(this.ENDPOINT + '/houses/' + id);
    return response;
  }
  /**
   * Fetchs name from url
   * @param url 
   * @returns name from url 
   */
  GetResourceFromUrl(url: string): Observable<ICharacter | IBook | IHouse> {
    return this.http.get<ICharacter | IBook | IHouse>(url).pipe(
      map((response) => response)
    )
  }

  /**
   * Fetchs names from urls
   * @param urls 
   * @returns names from urls 
   */
  GetResourcesFromUrls(urls: string[]): Observable<any[]> {
    let calls: Observable<any>[] = [];
    urls.forEach(url => {
      calls.push(this.http.get<any>(url));
    });
    return forkJoin(calls).pipe(
      map(response => {
        let res = response.map(r => r)
        return res;
      }),
    )
  }

}
