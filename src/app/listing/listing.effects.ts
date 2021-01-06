import * as _ from "lodash";
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, filter, map, mergeMap, pairwise, tap } from 'rxjs/operators';
import { listingActions, listingRefetchSuccess } from './listing.actions';
import { ListingService } from './listing.service';
import { Coin, CoinUpdate } from "./listing.model";
import { ToastService } from "../shared/toast/toast.service";
import { ToastPosition, ToastType } from "../shared/toast/toast.model";

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
        map(x => {
          const prev = x[0]; // previous data 
          const next = x[1]; // new data that was freshly fetched
          return prev.payload.reduce((changes, prevCoin) => {
            const updatedCoinData = next.payload.find(i => i.id===prevCoin.id);

            if(updatedCoinData && prevCoin.current_price !== updatedCoinData.current_price) {
              const amountDiff = updatedCoinData.current_price - prevCoin.current_price;
              const percentDiff = (amountDiff/prevCoin.current_price)*100;
              changes.push({
                coin: updatedCoinData,
                differencePercent: percentDiff,
                differenceAmount: amountDiff                 
              });
            }
            return changes;
          }, [] as CoinUpdate[]);
        }),
        filter(x => !_.isEmpty(x)),
        tap(() => this.toastService.reset()),
        map(x => x.map(item => `${item.coin.name} (${item.coin.symbol.toUpperCase()}) has changed by ${item.differencePercent.toFixed(2)}%`)),
        tap(x => this.toastService.setMessage(x.join('<br/> '), ToastType.success, ToastPosition.bottomCenter))
      ),
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
        private moviesService: ListingService,
        private toastService: ToastService
  ) {}
}
