import { Component, OnInit, Inject } from '@angular/core';
import { ActionsService } from '../core/actions-service';
import { Observable, BehaviorSubject } from 'rxjs';
import { ActionModel } from '../shared/models/action.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, tap, filter } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Component({
	selector: 'app-action-detail',
	templateUrl: './action-detail.component.html',
	styleUrls: ['./action-detail.component.css']
})
export class ActionDetailComponent implements OnInit {

	private actionSubject: BehaviorSubject<ActionModel> = new BehaviorSubject<ActionModel>(null);

	action$: Observable<ActionModel> = this.actionSubject.asObservable();

	step = 0;

	constructor(
		private route: ActivatedRoute,
		public actionService: ActionsService,
		@Inject(DOCUMENT) private readonly document: any) { }

	ngOnInit(): void {
		this.route.data
			.subscribe((data: { action: ActionModel }) => {
				const script = this.document.createElement('script');
				script.type = 'text/javascript';
				script.async = true;
				script.src = data.action.stepsPath + "/step0.js";
				script.onload = () => {
					const el = this.document.createElement("corrigo-combobox");
					el.setAttribute("name", "Corrigo");
					this.document.body.appendChild(el);
				};

				this.document.body.appendChild(script);
			});
	}


	setStep(index: number) {
		this.step = index;
	}

	nextStep() {
		this.step++;
	}

	prevStep() {
		this.step--;
	}
}
