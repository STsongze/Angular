import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'my-child',
  templateUrl: './app/child.component.html'
})
export class ChildComponent {
  @Input() private message: string;
  @Output() private outer = new EventEmitter<string>();
	constructor() {	}
  
  sendToParent() {
    this.outer.emit('message from child');
  }
}
