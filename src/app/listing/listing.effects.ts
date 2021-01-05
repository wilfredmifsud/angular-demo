import * as _ from "lodash";
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, pairwise, tap } from 'rxjs/operators';
import { ListingAction, listingActions, listingRefetchSuccess } from './listing.actions';
import { ListingService } from './listing.service';
import { Coin } from "./listing.model";

@Injectable({
  providedIn: 'root',
})
export class ListingEffects {
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(listingActions.refetch),
      mergeMap(() =>
        this.moviesService.getAll$().pipe(
          map((x) => ({ type: listingActions.refetchSuccess, payload: x })),
          catchError(() => of({ type: listingActions.refetchError }))
        )
      )
    )
  );

  change$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<ReturnType<typeof listingRefetchSuccess>>(listingActions.refetchSuccess),
        pairwise(),
        tap(x => {
          const prev = x[0];
          const next = x[1];
debugger;
          prev.payload.map(prevCoin => {
            const updatedCoinData = next.payload.find(i => i.id===prevCoin.id);
            if(updatedCoinData && prevCoin.current_price !== updatedCoinData.current_price) {
              const percentDiff = ((updatedCoinData.current_price - prevCoin.current_price)/prevCoin.current_price)*100;
              if(percentDiff > 1) {
                console.warn(">>>>>>>>>>>>>>>>>>>>>>> price changed for ", updatedCoinData.name,percentDiff, (updatedCoinData.current_price - prevCoin.current_price)) ;

              } else {
                console.warn(">>>>>>> minor >>>>>>>>>>>>>>>> price changed for ", updatedCoinData.name,percentDiff, (updatedCoinData.current_price - prevCoin.current_price)) ;

              }
            }
          })
        })
      ),
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
        private moviesService: ListingService
  ) {}
}
