import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { ActionsService } from '../core/actions-service';
import { Observable, BehaviorSubject } from 'rxjs';
import { ActionModel } from '../shared/models/action.model';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, map } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { StepDefinition } from '../shared/models/step.definition';
import { StepsConfig } from '../shared/models/steps.config';
import { environment } from 'src/environments/environment';

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
		private httClient: HttpClient,
		private hostElement: ElementRef,
		@Inject(DOCUMENT) private readonly document: any) { }

	ngOnInit(): void {
		this.route.data
			.pipe(
				mergeMap((data: { action: ActionModel }) => this.httClient.get<StepDefinition[]>(`${data.action.stepsPath}/stepsConfig.json`)
					.pipe(
						map(response => new StepsConfig(response, data.action.stepsPath))
					)
				),
			)
			.subscribe(stepsConfig => {
				//TODO maybe needs sorting by stepName
				stepsConfig.stepsDefinition.forEach(step => {
					const script = this.document.createElement('script');
					script.type = 'text/javascript';
					script.src = `${environment.baseUrl}${stepsConfig.stepPath}/${step.stepName}`;
					script.onload = () => {
						const el = this.document.createElement(step.elementName);
						this.hostElement.nativeElement.appendChild(el);
					};
					this.document.body.appendChild(script);
				});


				// const script = this.document.createElement('script');
				// script.type = 'text/javascript';
				// script.async = true;
				// script.src = data.action.stepsPath + "/step0.js";
				// script.onload = () => {
				// 	const el = this.document.createElement("corrigo-combobox");
				// 	el.setAttribute("name", "Corrigo");
				// 	this.document.body.appendChild(el);
				// };

				// this.document.body.appendChild(script);
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
