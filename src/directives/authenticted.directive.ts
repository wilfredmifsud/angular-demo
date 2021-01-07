import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";

import { Store } from "@ngrx/store";

import { Subscription } from "rxjs";
import { tap } from "rxjs/operators";

import { AppState } from "src/app/app.model";
import { isLoggedIn } from "src/app/auth/auth.selector";

@Directive({
  selector: "[loggedIn]",
})
export class AuthenticatedDirective implements OnInit, OnDestroy {
  private isLogged$ = this.store.select(isLoggedIn);
  private isLogged$$ = Subscription.EMPTY;

  @Input("loggedIn") renderTemplate!: boolean;

  constructor(
    private store: Store<AppState>,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    this.isLogged$$ = this.isLogged$
      .pipe(
        tap(x => console.warn(x)),
        tap((x) => {
          if (x?.username) {
            if (this.renderTemplate) {
              this.viewContainer.createEmbeddedView(this.templateRef);
            } else {
              this.viewContainer.clear();
            }
          } else {
            if (this.renderTemplate) {
              this.viewContainer.clear();
            } else {
              this.viewContainer.createEmbeddedView(this.templateRef);
            }
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.isLogged$$.unsubscribe();
  }
}
