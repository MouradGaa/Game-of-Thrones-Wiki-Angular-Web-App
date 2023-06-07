import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterServiceService {

  public filterString!: string;
  public category!: string;

  constructor() { }
}
