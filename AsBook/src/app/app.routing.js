"use strict";
var router_1 = require('@angular/router');
var app_standings_1 = require('./app.standings');
var app_scoring_1 = require('./app.scoring');
var app_admin_1 = require('./app.admin');
var appRoutes = [
    { path: "Standings", component: app_standings_1.AppStandings },
    { path: "Scoring", component: app_scoring_1.AppScoring },
    { path: "Admin", component: app_admin_1.AppAdmin },
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map