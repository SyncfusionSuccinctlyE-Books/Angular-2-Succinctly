
import { Routes, RouterModule } from '@angular/router';
import { AppStandings }  from './app.standings';
import { AppScoring }    from './app.scoring';
import { AppAdmin }    from './app.admin';

const appRoutes: Routes = [
    { path: "Standings",component: AppStandings },
    { path: "Scoring",component: AppScoring },    
    { path: "Admin",component: AppAdmin },
];

export const appRoutingProviders: any[] = [];
export const routing = RouterModule.forRoot(appRoutes);
