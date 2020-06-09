import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ActionModel } from '../shared/models/action.model';
import { Observable, of, EMPTY } from 'rxjs';
import { ActionsService } from './actions-service';
import { take, mergeMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ActionResolverService implements Resolve<ActionModel> {

	constructor(
		private actionService: ActionsService,
		private router: Router) { }
	resolve(route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<ActionModel> {
		let id = route.paramMap.get('id');

		return this.actionService.getById(id)
			.pipe(
				take(1),
				mergeMap(action => {
					if (action) {
						return of(action);
					} else {
						this.router.navigate(['/actions']);
						return EMPTY;
					}
				})
			)
	}
}
