import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-home',
  },
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
