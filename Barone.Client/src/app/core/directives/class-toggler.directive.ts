import { AfterViewChecked, Directive, HostListener, Input } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Directive({
  selector: '[ClassToggler]'
})
export class ClassTogglerDirective implements AfterViewChecked {

  private _destinationElement: HTMLElement;
  private _active = false;

  @Input() public ClassToggler: string;
  @Input() public ClassesToToggle = ['show'];
  @Input() public autoReset: false;

  constructor() { }

  public ngAfterViewChecked() {
    this._destinationElement = document.getElementById(this.ClassToggler);
  }

  @HostListener('click', ['$event'])
  private toggleClass(raisedEvent: Event) {

    if (!isNullOrUndefined(this._destinationElement)) {
      this.ClassesToToggle.forEach(className => {
        this._destinationElement.classList.toggle(className);
        this._active = this._destinationElement.classList.contains(className);
      });
    }
    raisedEvent.stopPropagation();
    raisedEvent.cancelBubble = true;
  }

  @HostListener('document:click', ['$event'])
  private closeDropdowns(element) {
    if (!this.autoReset || !this._active) {
      return;
    }

    this.ClassesToToggle.forEach(className => {
      if (!isNullOrUndefined(this._destinationElement)){
      if (this._destinationElement.classList.contains(className)) {
        this._destinationElement.classList.toggle(className);
      }
    }
    });

    this._active = false;
  }
}
