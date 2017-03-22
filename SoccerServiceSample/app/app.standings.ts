/*
    Standings component
*/
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

// Our interfaces
import { Team } from './interfaces/Teams';
import { SoccerService} from './services/soccerService';

  @Component({
    template: '<h3>Standings</h3>',
    providers: [Title,SoccerService]    
   })

export class AppStandings {
         public UsingAsync: boolean = false;
         public MyTeams: Team[];

         public constructor(private _titleService: Title,
                          private _soccerService: SoccerService ) {
         this._titleService.setTitle("422 Sportsplex");
         this.getTeams();                              
         }

        getTeams() {
        if (this.UsingAsync) {
            let xx = this._soccerService.getAllTeamsAsync();
                xx.then((Teams:Team[])=> this.MyTeams =Teams );
        }
        else
        {
                this.MyTeams = this._soccerService.getAllTeams();
        }
     }
}
