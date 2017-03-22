"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/*
    Standings component
*/
var core_1 = require('@angular/core');
var core_2 = require('@angular/core');
var soccerService_1 = require('./services/soccerService');
var AppStandings = (function () {
    function AppStandings(_soccerService) {
        this._soccerService = _soccerService;
        this.UsingAsync = false;
        this.LeagueName = "";
        this.LeagueName = "Over 30 men's league";
        this.getSchedule();
        this.ComputeRankings();
    }
    AppStandings.prototype.getSchedule = function () {
        var _this = this;
        if (this.UsingAsync) {
            var xx = this._soccerService.getScheduleAsnyc();
            xx.then(function (Schedules) { return _this.MySchedule = Schedules; });
        }
        else {
            this.MySchedule = this._soccerService.getSchedule();
        }
    };
    AppStandings.prototype.ComputeRankings = function () {
        var _this = this;
        var curDate = new Date();
        var TeamAt;
        this.Standings = []; // Empty the array
        this.MySchedule.forEach(function (element) {
            // If game has already been played
            if (element.PlayingDate < curDate && element.HomeScore >= 0) {
                TeamAt = _this.FindTeam(element.HomeTeam);
                if (TeamAt < 0) {
                    _this.Standings.push({ TeamName: element.HomeTeam,
                        GamesPlayed: 0, Wins: 0, Ties: 0,
                        GoalsFor: 0, GoalsAgainst: 0 });
                    TeamAt = _this.Standings.length - 1;
                }
                _this.UpdCurrentRow(element, TeamAt, "H");
                TeamAt = _this.FindTeam(element.AwayTeam);
                if (TeamAt < 0) {
                    _this.Standings.push({ TeamName: element.AwayTeam,
                        GamesPlayed: 0, Wins: 0, Ties: 0,
                        GoalsFor: 0, GoalsAgainst: 0 });
                    TeamAt = _this.Standings.length - 1;
                }
                _this.UpdCurrentRow(element, TeamAt, "A");
            }
        });
        // Sort standings
        this.Standings.sort(function (left, right) {
            if (left.Wins * 3 + left.Ties < right.Wins * 3 + right.Ties)
                return 1;
            if (left.Wins * 3 + left.Ties > right.Wins * 3 + right.Ties)
                return -1;
            // Else, then are tied, typically we'd add addition logic to break Ties
            if (left.GoalsFor < right.GoalsFor)
                return 1;
            if (left.GoalsFor > right.GoalsFor)
                return -1;
            // Finally,return zero if still tied.
            return 0;
        });
    };
    ;
    AppStandings.prototype.UpdCurrentRow = function (element, TeamAt, HomeAway) {
        this.Standings[TeamAt].GamesPlayed++;
        if (HomeAway == "H") {
            this.Standings[TeamAt].GoalsFor += element.HomeScore;
            this.Standings[TeamAt].GoalsAgainst += element.AwayScore;
            // Win       
            if (element.HomeScore > element.AwayScore) {
                this.Standings[TeamAt].Wins++;
            }
        }
        if (HomeAway == "A") {
            this.Standings[TeamAt].GoalsFor += element.AwayScore;
            this.Standings[TeamAt].GoalsAgainst += element.HomeScore;
            // Win       
            if (element.AwayScore > element.HomeScore) {
                this.Standings[TeamAt].Wins++;
            }
        }
        if (element.HomeScore == element.AwayScore) {
            this.Standings[TeamAt].Ties++;
        }
    };
    // Find the team or -1
    AppStandings.prototype.FindTeam = function (TeamName) {
        var FoundAt = -1;
        for (var _x = 0; _x < this.Standings.length; _x++) {
            if (this.Standings[_x].TeamName == TeamName) {
                return _x;
            }
        }
        return FoundAt;
    };
    AppStandings = __decorate([
        core_1.Component({
            templateUrl: './app/Views/Standings.html',
            encapsulation: core_2.ViewEncapsulation.Native,
            // Set styles for template
            styles: ["\n            h3 {text-align:center;color:navy;font-size:x-large;margin:0px;}\n            table {\n              width:92%;margin:1em auto;font-size:large;\n              font-family:\"Comic Sans MS\", cursive, sans-serif; }\n            th { text-decoration:underline;}\n          "],
            providers: [soccerService_1.SoccerService]
        }), 
        __metadata('design:paramtypes', [soccerService_1.SoccerService])
    ], AppStandings);
    return AppStandings;
}());
exports.AppStandings = AppStandings;
//# sourceMappingURL=app.standings.js.map