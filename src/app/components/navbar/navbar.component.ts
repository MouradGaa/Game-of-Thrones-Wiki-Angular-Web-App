import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})



export class NavbarComponent implements OnInit {


  constructor() { }

  @ViewChild('btn') button: MatButton | undefined;

  ngOnInit(): void {
  }
 
  changeEvent() {
    this.button?.focus();
  }


}
