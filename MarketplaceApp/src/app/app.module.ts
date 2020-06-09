import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from '@angular/material/card';

import { ActionsListComponent } from './actions-list/actions-list.component';
import { ActionsService } from './core/actions-service';
import { SetBasePathInterceptor } from './shared/interceptors/set-base-url-interceptor';
import { ActionDetailComponent } from './action-detail/action-detail.component';

@NgModule({
	declarations: [
		AppComponent, ActionsListComponent, ActionDetailComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatGridListModule,
		HttpClientModule,
		MatCardModule
	],
	providers: [
		ActionsService,
		{ provide: HTTP_INTERCEPTORS, useClass: SetBasePathInterceptor, multi: true },
	],
	bootstrap: [AppComponent]
})
export class AppModule {

	constructor(private actionsService: ActionsService) {
		this.actionsService.ladAllActions().subscribe();
	}
}
