import {
	Component,
	EventEmitter,
	Output,
	ViewEncapsulation
} from "@angular/core";
import { NAVIGATION_LINKS } from "../navigation.const";

@Component({
	selector: "app-navigation-toolbar",
	templateUrl: "./toolbar.component.html",
	styleUrls: ["./toolbar.component.scss"],
	encapsulation: ViewEncapsulation.None,
	host: {
		class: "app-navigation-toolbar"
	}
})
export class ToolbarComponent {
	links = NAVIGATION_LINKS;

	@Output() toggleSidenav = new EventEmitter<void>();

	triggerToggleSidenav() {
		this.toggleSidenav.emit();
	}
}
