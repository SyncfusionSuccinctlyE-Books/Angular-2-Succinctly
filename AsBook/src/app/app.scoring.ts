/*
    Scoring component
*/
import { Component } from '@angular/core';

// Our application services and interfaces
import { Schedule } from './interfaces/schedule';
import { SoccerService} from './services/soccerService';
import { WebService } from './services/WebService';

  @Component({
    templateUrl: './app/Views/scoring.html',          // HTML Template name   
    styles: [` h3 {text-align:center;color:navy;
                  font-size:x- large;margin:0px;font-weight:bold;}
            select { font-size:large;margin-left:25px;} `],
    providers: [SoccerService,WebService]            

   })
export class AppScoring { 

     private UsingAsync: boolean = false;
     private CurGame: number = 0;
     public MySchedule: Schedule[];
     public LeagueName: string;
     public HomeTeam : string;
     public AwayTeam : string;
     public HomeScore : number =0;
     public AwayScore : number =0;
     public SeasonStart: Date = new Date;
     public CurrentRole: number=1;
     public IPAddr: string; 
     public ErrMsg: string;
     public MD5Hash: string;


     public constructor(private _soccerService: SoccerService,
                        private _web: WebService ) {
       this.LeagueName = "Over 30 men's league";
       this.getSchedule();
       this.SeasonStart.setTime( this.SeasonStart.getTime() +4 * 86400000 );      
       _web.getIP().subscribe( IP => this.IPAddr = IP,Error => this.ErrMsg = Error);

        
        if (this.MySchedule.length>0) {
            this.UpdVariables(0);    // Default to first game in drop-down list
            this.CurGame=1;
         }
     }
     // Change to new game, updating screen display
     public onSchedChange(GameValue:number) {
       if (GameValue>0) 
       {
         this.UpdVariables(GameValue);
         this.CurGame = GameValue;
       } 
     }
     // Get the score from the form and update it
     public onRecordScores() {
       this.MySchedule[this.CurGame-1].AwayScore = Number(this.AwayScore);
       this.MySchedule[this.CurGame-1].HomeScore = Number(this.HomeScore);       
     }

     // Update screen variable based on current game
     private UpdVariables(GameID: number) {

          // Need to search Schedule array, looking for game ID
          var x : number =0;
          if (GameID >0) {
            x = GameID-1;
          }  

          this.HomeTeam = this.MySchedule[x].HomeTeam;
          this.AwayTeam = this.MySchedule[x].AwayTeam;
          this.HomeScore = this.MySchedule[x].HomeScore;
          this.AwayScore = this.MySchedule[x].AwayScore;
     } 


     // Get the schedule (only showing games not yet scored)     
     private getSchedule() {
       if (this.UsingAsync) {
        let xx = this._soccerService.getScheduleAsnyc();
            xx.then((Schedules:Schedule[])=> this.MySchedule =Schedules );
       }
       else
       {
        this.MySchedule = this._soccerService.getSchedule();
       }
     }



}
