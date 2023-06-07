import { Component, OnInit, Inject } from '@angular/core';
import { HttpGotService } from 'src/app/services/http-got.service';
import { lastValueFrom, Observable, } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-single-house',
  templateUrl: './single-house.component.html',
  styleUrls: ['./single-house.component.scss']
})
export class SingleHouseComponent implements OnInit {

  public id: string | null = '';
  public overLord: any = "";
  public currentLord: any = "";
  public heir: any = "";
  public founder = "";
  public cadetBranches: any[] = [];
  public swornMembers: any[] = [];

  public house!: any;

  constructor(
    private _httpGotService: HttpGotService,
    public loaderService: LoaderService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getHouseData();
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
   *
   * async function 
   * Gets house data
   * get data for every resource in the house entity 
   */
  async getHouseData() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this._httpGotService.getHouseById(parseInt(this.id)).subscribe(async house => {
        this.house = house;
        if (this.house.overlord) {
          const overlord$ = this.GetResourceFromUrl(this.house.overlord);
          this.overLord = await lastValueFrom(overlord$);
        }
        if (this.house.currentLord) {
          const currentlord$ = this.GetResourceFromUrl(this.house.currentLord);
          this.currentLord = await lastValueFrom(currentlord$);
        }
        if (this.house.heir) {
          const heir$ = this.GetResourceFromUrl(this.house.heir);
          this.heir = await lastValueFrom(heir$);
        }
        if (this.house.founder) {
          const founder$ = this.GetResourceFromUrl(this.house.founder);
          this.founder = await lastValueFrom(founder$);
        }
        if (this.house.swornMembers && this.house.swornMembers.length > 0) {
          const swornMembers$ = this.GetResourcesFromUrls(this.house.swornMembers);
          this.swornMembers = await lastValueFrom(swornMembers$);
        }
        if (this.house.cadetBranches && this.house.cadetBranches.length > 0) {
          const cadetBranches$ = this.GetResourcesFromUrls(this.house.cadetBranches);
          this.cadetBranches = await lastValueFrom(cadetBranches$);
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
