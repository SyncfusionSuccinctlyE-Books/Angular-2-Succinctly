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
/**
  * SoccerService
 * Joe Booth:  Angular 2 Succinctly
 */
var core_1 = require('@angular/core');
var Schedule_data_1 = require('./Schedule-data');
var SoccerService = (function () {
    function SoccerService() {
    }
    SoccerService.prototype.getScheduleAsnyc = function () {
        return Promise.resolve(Schedule_data_1.SEASON_SCHEDULE);
    };
    SoccerService.prototype.getSchedule = function () {
        return Schedule_data_1.SEASON_SCHEDULE;
    };
    SoccerService.prototype.getAllTeamsAsync = function () {
        return Promise.resolve(Schedule_data_1.TEAMS);
    };
    SoccerService.prototype.getAllTeams = function () {
        return Schedule_data_1.TEAMS;
    };
    SoccerService.prototype.updateScore = function (gameNo, home, away, notes) {
    };
    SoccerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SoccerService);
    return SoccerService;
}());
exports.SoccerService = SoccerService;
//# sourceMappingURL=soccerService.js.map