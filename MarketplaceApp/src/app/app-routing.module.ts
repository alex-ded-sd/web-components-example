import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActionsListComponent } from './actions-list/actions-list.component';
import { ActionDetailComponent } from './action-detail/action-detail.component';
import { ActionResolverService } from './core/action-resolver.service';


const routes: Routes = [
	{ path: 'actions', component: ActionsListComponent },
	{
		path: 'actions/:id',
		component: ActionDetailComponent,
		resolve: {
			action: ActionResolverService
		}
	},
	{ path: '', redirectTo: '/actions', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
