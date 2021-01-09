import { NgModule } from "@angular/core";

import { AuthenticatedDirective } from "./directives/authenticted.directive";
import { CoinIndicatorDirective } from "./directives/coin-indicator.directive";
import { ToastModule } from "./toast/toast.module";

const SharedDirectives = [
	CoinIndicatorDirective,
	AuthenticatedDirective
];

@NgModule({
	declarations: [
		...SharedDirectives
	],
	imports: [ToastModule],
	exports: [ToastModule, ...SharedDirectives]
})
export class SharedModule {}
