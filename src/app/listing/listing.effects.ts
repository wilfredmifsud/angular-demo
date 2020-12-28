import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, of } from "rxjs";
import { catchError, ignoreElements, map, mergeMap, tap } from "rxjs/operators";
import { listingActions, listingRefetch, listingRefetchError, listingRefetchSuccess } from "./listing.actions";
import { ListingService } from "./listing.service";


@Injectable({
  providedIn: "root"
})
export class ListingEffects {
  getAll$ = createEffect(() =>
      this.actions$.pipe(
        ofType(listingActions.refetch),
        mergeMap(() => this.moviesService.getAll$()
        .pipe(
          map(x => ({ type: listingActions.refetchSuccess, payload: x })),
          catchError(() =>  of({ type: listingActions.refetchError}))
        ))
      )
      );

      updateItem$ = createEffect(() =>
      this.actions$.pipe(
        ofType(listingActions.updateItem),
        mergeMap((x:any)  => this.moviesService.update$(x.payload)
        .pipe(
          map(x => ({ type: listingActions.updateItemSucces, payload: x })),
          catchError(() =>  of({ type: listingActions.updateItemError}))
        ))
      )
      );

  constructor(
    private actions$: Actions,
    private moviesService: ListingService
  ) { }
}
