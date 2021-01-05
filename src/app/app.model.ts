import { ListingState } from "./listing/listing.model";
import { SharedState } from "./shared/shared.model";

export interface AppState {
    listing: ListingState;
    shared: SharedState
}