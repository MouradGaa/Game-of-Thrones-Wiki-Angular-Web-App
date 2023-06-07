import { Component, OnInit, ViewChild } from '@angular/core';
import { IHouse } from 'src/app/models/house.type';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { HttpGotService } from '../../services/http-got.service'
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { HouseDialogComponent } from '../house-dialog/house-dialog.component';
import { ICharacter } from 'src/app/models/character.type';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.scss']
})
export class HousesComponent implements OnInit {

  public name: string = '';
  public houses: IHouse[] = [];
  public currentLord!: ICharacter;

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
    this._httpGotService.getHouses(this.pageIndex, this.pageSize).subscribe(data => {
      this.houses = data;
      this.setPagination(445, this.pageIndex, this.pageSize);
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
 * Gets current lord
 * @param house 
 * @returns current lord 
 */
getCurrentLord(house: IHouse): ICharacter {
    this._httpGotService.getCharacterByUrl(house.currentLord).subscribe(data => {
      this.currentLord = data;
    }
    );
    return this.currentLord;
  }

/**
 * Determines whether paginate changes and move to the next page
 * @param event 
 */
onPaginateChange(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }
/**
 * Opens dialog and pass data to it 
 * @param house 
 */
openDialog(house: IHouse): void {
    const dialogRef = this.dialog.open(HouseDialogComponent, {
      height: "92%",
      width: "80%",
      data: house // passing the house details to the dialog
    });
  }



}
