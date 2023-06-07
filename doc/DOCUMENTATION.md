# Game Of Thrones Angular Web App

## Introduction:

An Angular Web application for the popular book series: Game Of thrones.
The application is built using the [Ice And Fire Api](https://anapioficeandfire.com/).
The user of the App can browse the world of the book series, He can navigate to 3 different pages: **Houses**/**Character**/**Books**. In each page the resources are displayed in form of cards ([Material Cards](https://material.angular.io/components/card/overview)), the user can search among them or navigate between pages. If a resource card is clicked, a Dialog is opened that displays more details and more resources. For example if the user clicks on a Book Card, a detailed dialog pops up with more details and a list of characters for that book, the user can click a specific character and navigate to its detailed page. 

## Architecture:
![deps](/game-of-thrones-app/doc/dependencies.png)

## Classes:

#### book-dialog/single-book:
these 2 classes are responsible for handling and displaying the detailed data about a specific book
#### books:
this class is responsible for handling and displaying the list of books.
#### character-dialog/single-character
these classes are responsible for handling and displaying the detailed data about a specific character
#### characters:
this class is responsible for handling and displayig the list of characters.
#### home:
this class represents the home page where a slider that allows navigation to the characters/houses/books pages is presented.
#### house-dialog/single-house:
these classes are responsible for handling and displaying the detailed data about a specific house
#### houses:
this class is responsible for handling and displayig the list of houses.
#### navbar:
this class represented the navigation bar that contains the navigation menu to different pages.


## Client-Server:
The Api functions are defined in the **http-got.service** file. This file can be extended with more functions that uses the API. 
##### http-got.service.ts
```typescript
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
```
Every function returns an Observable of type of the specific entity (an interface is defined for each entity in **models**).
##### book.type.ts
```typescript
export interface IBook {
    url: string,
    name: string,
    isbn: string,
    authors: string[],
    numberOfPages: number,
    publisher: string,
    country: string,
    mediaType: string,
    released: Date,
    characters: string[],
    povCharacters: string[],
}
```
In each component, we subscribe the specific resources data which can be displayed in the UI. 
##### book-dialog.component.ts
```typescript
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
```
The API response are awaited and then displayed to prevent the blocking of the UI.
##### book-dialog.component.html
```html
..
..
..
<mat-list role="list">
    <h3 class="mat-title">Isbn: <span> {{book.isbn}} </span> </h3>
    <h3 class="mat-title">Authors: <span>{{book.authors}}</span></h3>
    <h3 class="mat-title">#Pages: <span>{{book.numberOfPages}}</span></h3>
    <h3 class="mat-title">Publisher: <span>{{book.publisher}}</span></h3>
    <h3 class="mat-title">Country: <span>{{book.country}}</span></h3>
    <h3 class="mat-title">Media Type: <span>{{book.mediaType}}</span></h3>
    <h3 class="mat-title">Release Date: <span>{{ToDate(book.released)}}</span></h3>
</mat-list>
..
..
..
```
