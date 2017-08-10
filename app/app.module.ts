import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { ChildComponent } from './child.component';
import { HighlightDirective } from './highlight.directive';
import { LoggerService } from './logger.service';

@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, ChildComponent, HighlightDirective ],
  providers: [ LoggerService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
