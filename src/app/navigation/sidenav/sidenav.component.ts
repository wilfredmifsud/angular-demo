import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { NAVIGATION_LINKS } from '../navigation.const';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-sidenav',
  },
})
export class SidenavComponent {

  links = NAVIGATION_LINKS;

}
