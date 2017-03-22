import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

  @Component({
    selector: 'main-app',
    templateUrl: './app/Views/MainMenu.html',
    providers: [Title]    
   })
export class AppComponent {
   public name='Blaire';
   public constructor(private _titleService: Title )
   {
         this._titleService.setTitle("422 Sportsplex");
         }
  }
