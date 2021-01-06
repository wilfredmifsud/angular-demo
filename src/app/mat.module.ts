import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

const MAT_MODULE_LIST = [
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatTabsModule
]
@NgModule({
  imports: [
    ...MAT_MODULE_LIST
  ],
  exports: [
    ...MAT_MODULE_LIST
  ]
})
export class MatModule { }
