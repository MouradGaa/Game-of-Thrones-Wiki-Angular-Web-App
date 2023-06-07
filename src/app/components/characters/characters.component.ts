import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICharacter } from 'src/app/models/character.type';
import { HttpGotService } from 'src/app/services/http-got.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { CharacterDialogComponent } from '../character-dialog/character-dialog.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  public characters: ICharacter[] | null = [];

  public name: string = '';

  pageEvent: PageEvent | void | undefined;

  // Pagination
  length: number = 0;
  pageIndex: number = 1;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  constructor(private _httpGotService: HttpGotService,
    public loaderService: LoaderService,
    public dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * on init
   */
  ngOnInit(): void {
    this._httpGotService.getCharacters(this.pageIndex, this.pageSize).subscribe(data => {
      this.characters = data.body;
      console.log(data)
      this.setPagination(2130, this.pageIndex, this.pageSize);
    });
  }

  /**
   * Sets pagination
   * @param length 
   * @param startIndex 
   * @param pageSize 
   */
  setPagination(length: number, startIndex: number, pageSize: number) {
    this.length = length;
    this.pageIndex = startIndex;
    this.pageSize = pageSize;
  }


/**
 * Determines whether paginate changes and move to next page
 * @param event 
 */
onPaginateChange(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }


/**
 * Opens dialog and pass data
 * @param character 
 */
openDialog(character: ICharacter): void {
    const dialogRef = this.dialog.open(CharacterDialogComponent, {
      height:"92%",
      width:"80%",
      data: character // passing the character details to the dialog
    });

  }

}
