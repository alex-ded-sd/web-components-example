import { Component, OnInit, Inject, ElementRef, OnDestroy, ViewChild } from '@angular/core';
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
import { ActionConfigCollectorService } from '../core/action-config-collector.service';

@Component({
	selector: 'app-action-detail',
	templateUrl: './action-detail.component.html',
	styleUrls: ['./action-detail.component.css']
})
export class ActionDetailComponent implements OnInit, OnDestroy {

	private actionSubject: BehaviorSubject<ActionModel> = new BehaviorSubject<ActionModel>(null);

	action$: Observable<ActionModel> = this.actionSubject.asObservable();

	steps: any[] = [];

	@ViewChild("stepsContainer")
	private stepsContainer: ElementRef;

	@ViewChild("sendData")
	private sendData: ElementRef;

	step = 0;

	constructor(
		private route: ActivatedRoute,
		public actionService: ActionsService,
		private httClient: HttpClient,
		private configCollector: ActionConfigCollectorService,
		@Inject(DOCUMENT) private readonly document: any) { }

	ngOnDestroy(): void {
		this.steps.forEach(step => this.stepsContainer.nativeElement.removeChild(step));
	}

	ngOnInit(): void {
		this.route.data
			.pipe(
				mergeMap((data: { action: ActionModel }) =>
					this.httClient.get<StepDefinition[]>(`${data.action.stepsPath}/stepsConfig.json`)
						.pipe(
							map(response => new StepsConfig(response, data.action.stepsPath))
						)
				),
			)
			.subscribe(stepsConfig => {
				//TODO maybe needs sorting by stepName
				stepsConfig.stepsDefinition.forEach(step => {
					const script = this.document.createElement('script');
					script.type = 'module';
					script.src = `${environment.baseUrl}${stepsConfig.stepPath}/${step.stepName}`;
					script.onload = () => {
						const el = this.document.createElement(step.elementName);
						el.addEventListener("stepchange", event => this.configCollector.push(event.detail));
						this.stepsContainer.nativeElement.appendChild(el);
						this.steps.push(el);
					};
					this.document.body.appendChild(script);
				});
			});
	}

	send() {
		const items = this.configCollector.getItems();
		let result = "";
		items.forEach(item => {
			const itemAsString = `${item.name}: ${item.value}\n`;
			result = `${result}${itemAsString}`;
		});
		alert(result);
		console.log(items);
	}
}
