import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[coinIndicator]'
})
export class CoinIndicatorDirective {

  @Input("coinIndicator") amount!: number;

constructor(
  private el: ElementRef,
  private renderer: Renderer2
)
 {

}
  ngOnInit() {
    debugger;
    if(this.amount > 0) {
      this.renderer.removeClass(this.el.nativeElement, "coin-indicator--down")
      this.renderer.addClass(this.el.nativeElement, "coin-indicator--up");
    } else {
      this.renderer.removeClass(this.el.nativeElement, "coin-indicator--up");
      this.renderer.addClass(this.el.nativeElement, "coin-indicator--down");
    }
  }

}
