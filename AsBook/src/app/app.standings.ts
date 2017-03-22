/*
    Standings component
*/
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

// Our interfaces
import { Team } from './interfaces/Teams';
import { Ranking } from './interfaces/rankings';
import { Schedule } from './interfaces/schedule';
import { SoccerService} from './services/soccerService';

  @Component({
    templateUrl : './app/Views/Standings.html', 
    encapsulation: ViewEncapsulation.Native,      // Use Shadow DOM
    // Set styles for template
    styles: [`
            h3 {text-align:center;color:navy;font-size:x-large;margin:0px;}
            table {
              width:92%;margin:1em auto;font-size:large;
              font-family:"Comic Sans MS", cursive, sans-serif; }
            th { text-decoration:underline;}
          ` ],
    providers: [SoccerService]    
   })

export class AppStandings {
         public UsingAsync: boolean = false;
         public LeagueName: string ="";
         public MySchedule: Schedule[];
         public Standings: Ranking[];
         
         public constructor( private _soccerService: SoccerService ) {
             this.LeagueName = "Over 30 men's league";
             this.getSchedule();
             this.ComputeRankings();
                              
         }
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
        public ComputeRankings() {
            var curDate: Date = new Date();
            var TeamAt: number;
            this.Standings = [];                     // Empty the array
            this.MySchedule.forEach(element => {
            // If game has already been played
            if (element.PlayingDate < curDate && element.HomeScore>=0) {
                  TeamAt = this.FindTeam(element.HomeTeam);
                  if (TeamAt<0) 
                  {
                    this.Standings.push( 
                        { TeamName: element.HomeTeam,
                            GamesPlayed:0,Wins:0,Ties:0,
                            GoalsFor:0,GoalsAgainst:0 } )
                    TeamAt = this.Standings.length-1;
                  }
                  this.UpdCurrentRow(element,TeamAt,"H");
                  TeamAt = this.FindTeam(element.AwayTeam);
                  if (TeamAt<0) 
                  {
                    this.Standings.push( 
                    {   TeamName: element.AwayTeam,
                        GamesPlayed:0,Wins:0,Ties:0,
                        GoalsFor:0,GoalsAgainst:0 } )
                        TeamAt = this.Standings.length-1;
                    }
                    this.UpdCurrentRow(element,TeamAt,"A");
                }
               });
        // Sort standings
        this.Standings.sort((left, right): number =>
            {
              if (left.Wins*3+left.Ties<right.Wins*3+right.Ties) return 1;
              if (left.Wins*3+left.Ties>right.Wins*3+right.Ties) return -1;
              // Else, then are tied, typically we'd add addition logic to break Ties
              if (left.GoalsFor<right.GoalsFor) return 1;
              if (left.GoalsFor>right.GoalsFor) return -1;
                // Finally,return zero if still tied.
            return 0;                                    
            })
        };
     private UpdCurrentRow(element:Schedule,TeamAt:number,HomeAway:string) {
              this.Standings[TeamAt].GamesPlayed ++;
              if (HomeAway=="H") {
                this.Standings[TeamAt].GoalsFor += element.HomeScore;
                this.Standings[TeamAt].GoalsAgainst += element.AwayScore;
                // Win       
                if (element.HomeScore>element.AwayScore)
                {
                  this.Standings[TeamAt].Wins++;
                }
              }
              if (HomeAway=="A") {
                this.Standings[TeamAt].GoalsFor += element.AwayScore;
                this.Standings[TeamAt].GoalsAgainst += element.HomeScore;
                // Win       
                if (element.AwayScore>element.HomeScore)
                {
                  this.Standings[TeamAt].Wins++;
                }
              }
              if (element.HomeScore==element.AwayScore)
              {
                this.Standings[TeamAt].Ties++;
              } 
     }


     // Find the team or -1
     private FindTeam(TeamName:string) : number {
       var FoundAt: number = -1;
       for (var _x=0;_x < this.Standings.length;_x++)
       {
            if (this.Standings[_x].TeamName==TeamName) {
              return _x;
            }
       }
       return FoundAt;
     }

        

     }

