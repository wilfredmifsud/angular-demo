import { Component, ViewEncapsulation } from '@angular/core';

import { NavigationToolbarMenuLinks } from './toolbar.model';

@Component({
  selector: 'app-navigation-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-navigation-toolbar',
  },
})
export class ToolbarComponent {

  links: NavigationToolbarMenuLinks[] = [
    {
      title: 'Home',
      url: 'home',
    },
    {
      title: 'News',
      url: 'news',
    },
    {
      title: 'Coins',
      url: 'coins',
    },
  ];

}
