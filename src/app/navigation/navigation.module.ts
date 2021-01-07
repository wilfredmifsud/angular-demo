import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MatModule } from "../mat.module";

import { ActionsComponent } from "./actions/actions.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";

export const NAVIGATION_LIST = [
  ActionsComponent,
   ToolbarComponent
];

@NgModule({
  declarations: [
    ...NAVIGATION_LIST
  ],
  imports: [RouterModule , FormsModule, ReactiveFormsModule, CommonModule, MatModule],
  exports: [
    ...NAVIGATION_LIST
  ],
})
export class NavigationModule {}
