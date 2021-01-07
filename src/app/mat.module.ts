import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';

const MAT_MODULE_LIST = [
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatChipsModule
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
