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
    Scoring component
*/
var core_1 = require('@angular/core');
var soccerService_1 = require('./services/soccerService');
var WebService_1 = require('./services/WebService');
var AppScoring = (function () {
    function AppScoring(_soccerService, _web) {
        var _this = this;
        this._soccerService = _soccerService;
        this._web = _web;
        this.UsingAsync = false;
        this.CurGame = 0;
        this.HomeScore = 0;
        this.AwayScore = 0;
        this.SeasonStart = new Date;
        this.CurrentRole = 1;
        this.LeagueName = "Over 30 men's league";
        this.getSchedule();
        this.SeasonStart.setTime(this.SeasonStart.getTime() + 4 * 86400000);
        _web.getIP().subscribe(function (IP) { return _this.IPAddr = IP; }, function (Error) { return _this.ErrMsg = Error; });
        if (this.MySchedule.length > 0) {
            this.UpdVariables(0); // Default to first game in drop-down list
            this.CurGame = 1;
        }
    }
    // Change to new game, updating screen display
    AppScoring.prototype.onSchedChange = function (GameValue) {
        if (GameValue > 0) {
            this.UpdVariables(GameValue);
            this.CurGame = GameValue;
        }
    };
    // Get the score from the form and update it
    AppScoring.prototype.onRecordScores = function () {
        this.MySchedule[this.CurGame - 1].AwayScore = Number(this.AwayScore);
        this.MySchedule[this.CurGame - 1].HomeScore = Number(this.HomeScore);
    };
    // Update screen variable based on current game
    AppScoring.prototype.UpdVariables = function (GameID) {
        // Need to search Schedule array, looking for game ID
        var x = 0;
        if (GameID > 0) {
            x = GameID - 1;
        }
        this.HomeTeam = this.MySchedule[x].HomeTeam;
        this.AwayTeam = this.MySchedule[x].AwayTeam;
        this.HomeScore = this.MySchedule[x].HomeScore;
        this.AwayScore = this.MySchedule[x].AwayScore;
    };
    // Get the schedule (only showing games not yet scored)     
    AppScoring.prototype.getSchedule = function () {
        var _this = this;
        if (this.UsingAsync) {
            var xx = this._soccerService.getScheduleAsnyc();
            xx.then(function (Schedules) { return _this.MySchedule = Schedules; });
        }
        else {
            this.MySchedule = this._soccerService.getSchedule();
        }
    };
    AppScoring = __decorate([
        core_1.Component({
            templateUrl: './app/Views/scoring.html',
            styles: [" h3 {text-align:center;color:navy;\n                  font-size:x- large;margin:0px;font-weight:bold;}\n            select { font-size:large;margin-left:25px;} "],
            providers: [soccerService_1.SoccerService, WebService_1.WebService]
        }), 
        __metadata('design:paramtypes', [soccerService_1.SoccerService, WebService_1.WebService])
    ], AppScoring);
    return AppScoring;
}());
exports.AppScoring = AppScoring;
//# sourceMappingURL=app.scoring.js.map