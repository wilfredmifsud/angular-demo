import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AppState } from 'src/app/app.model';
import { authActions } from 'src/app/auth/auth.actions';
import { AuthUserProfile } from 'src/app/auth/auth.model';
import { isLoggedIn } from 'src/app/auth/auth.selector';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navigation-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-navigation-actions',
  },
})
export class ActionsComponent implements OnInit{

  profile!: AuthUserProfile | null;
  showLogin = false;
  loginForm!: FormGroup;

  private isLogged$ = this.store.select(isLoggedIn);
  private isLogged$$ = Subscription.EMPTY;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    });

    this.isLogged$$ = this.isLogged$.pipe(
      tap(x => {
        if(x?.username) {
          this.profile = x;
          this.loginForm.reset();
          return;
        }
        this.profile = null;
      })
    ).subscribe();
  }

  toggleLogin() {
    this.showLogin = !this.showLogin;
  }

  doLogin() {
    if(!this.loginForm.valid) {
      return;
    }
    this.store.dispatch({type: authActions.login, payload: {username: this.loginForm.controls.username.value, password: this.loginForm.controls.password.value}});
  }

  doLogout() {
    this.store.dispatch({type: authActions.logout});
  }

  ngOnDestroy() {
    this.isLogged$$.unsubscribe();
  }

}
