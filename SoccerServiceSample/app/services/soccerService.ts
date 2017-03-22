/**
  * SoccerService
 * Joe Booth:  Angular 2 Succinctly
 */
import { Injectable }    from '@angular/core';
import {SEASON_SCHEDULE,TEAMS } from './Schedule-data';

 
@Injectable()
export class SoccerService {



    getScheduleAsnyc(){
        return Promise.resolve(SEASON_SCHEDULE);
    }
    getSchedule(){
        return SEASON_SCHEDULE;
    }

    getAllTeamsAsync() {
        return Promise.resolve(TEAMS);
    }

    getAllTeams() {
        return TEAMS;        
    }

    updateScore(gameNo:number,home:number,away:number,notes:string) {


    }




}
