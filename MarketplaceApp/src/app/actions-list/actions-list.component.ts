import { Component, OnInit } from '@angular/core';
import { ActionsService } from '../core/actions-service';
import { Observable, from } from 'rxjs';
import { ActionModel } from '../shared/models/action.model';
import { tap, map, switchMap, toArray } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Component({
	selector: 'app-actions-list',
	templateUrl: './actions-list.component.html',
	styleUrls: ['./actions-list.component.css']
})
export class ActionsListComponent implements OnInit {

	actions$: Observable<ActionModel[]>;

	constructor(public actionsService: ActionsService) { }

	ngOnInit(): void {
	}

}
