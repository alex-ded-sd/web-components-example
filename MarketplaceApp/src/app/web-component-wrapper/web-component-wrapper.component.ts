import { Component, OnInit, Input, OnDestroy, ElementRef, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';

import { ActionConfigCollectorService } from '../core/action-config-collector.service';
import { DOCUMENT } from '@angular/common';

@Component({
	selector: 'app-web-component-wrapper',
	templateUrl: './web-component-wrapper.component.html',
	styleUrls: ['./web-component-wrapper.component.css']
})
export class WebComponentWrapperComponent implements OnInit, OnDestroy {

	@Input()
	stepPath: string;

	@Input()
	elementName: string;

	@Input()
	scriptName: string;

	step: any;

	script: any;

	constructor(
		private configCollector: ActionConfigCollectorService,
		private hostElement: ElementRef,
		@Inject(DOCUMENT) private readonly document: any) { }

	ngOnInit(): void {
		this.renderWebComponent();
	}

	ngOnDestroy(): void {
		this.hostElement.nativeElement.removeChild(this.step);
		this.document.body.removeChild(this.script);
	}

	renderWebComponent() {
		const script = this.document.createElement('script');
		script.type = 'module';
		script.src = `${environment.baseUrl}${this.stepPath}/${this.scriptName}`;
		script.onload = () => {
			const el = this.document.createElement(this.elementName);
			el.addEventListener("stepchange", event => this.configCollector.push(event.detail));
			this.hostElement.nativeElement.appendChild(el);
			this.step = el;
		};
		this.document.body.appendChild(script);
		this.script = script;
	}
}
