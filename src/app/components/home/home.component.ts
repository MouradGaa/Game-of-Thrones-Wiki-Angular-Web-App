import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    autoWidth:true,
    autoHeight:true,
    autoplay:true,
    autoplayTimeout:4000,
    autoplayHoverPause:true,
    dots:false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    navSpeed: 800,
    autoplaySpeed: 800,
    center: true,
    navText: [],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      760: {
        items: 1
      },
      1000: {
        items: 1
      }
    },
    nav: true,
  }

  constructor() { }

  ngOnInit(): void {
  }

}
