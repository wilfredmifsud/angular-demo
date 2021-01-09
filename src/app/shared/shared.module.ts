import { NgModule } from "@angular/core";
import { ToastModule } from "./toast/toast.module";

@NgModule({
	imports: [ToastModule],
	exports: [ToastModule]
})
export class SharedModule {}
