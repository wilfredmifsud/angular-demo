import { AuthState } from "./auth/auth.model";
import { ListingState } from "./listing/listing.model";
import { SharedState } from "./shared/shared.model";

export interface AppState {
    listing: ListingState;
    shared: SharedState;
    auth: AuthState;
}
