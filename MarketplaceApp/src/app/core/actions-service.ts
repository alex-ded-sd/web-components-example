import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { ActionModel } from '../shared/models/action.model';
import { shareReplay, tap, switchMap, toArray, map, filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ActionsService {

	private actionsSubject: BehaviorSubject<ActionModel[]> = new BehaviorSubject<ActionModel[]>(null);
	allActions$: Observable<ActionModel[]> = this.actionsSubject.asObservable();

	constructor(private httpClient: HttpClient) { }

	ladAllActions(): Observable<ActionModel[]> {
		return this.httpClient.get<ActionModel[]>("actions")
			.pipe(
				switchMap(actions =>
					from(actions)
						.pipe(
							map(action => {
								const newAction = { ...action };
								newAction.logoPath = `${environment.baseUrl}${action.logoPath}`;
								newAction.stepsPath = `${environment.baseUrl}${action.stepsPath}`;
								return newAction;
							}),
							toArray()
						)),
				tap(actions => this.actionsSubject.next(actions)),
				shareReplay()
			)
	}

	getById(id: string): Observable<ActionModel> {
		return this.allActions$
			.pipe(
				filter(action => !!action),
				map(actions => actions.find(action => action.id == id))
			)
	}
}
