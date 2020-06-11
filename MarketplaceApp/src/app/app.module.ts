import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

import { ActionsListComponent } from './actions-list/actions-list.component';
import { ActionsService } from './core/actions-service';
import { SetBasePathInterceptor } from './shared/interceptors/set-base-url-interceptor';
import { ActionDetailComponent } from './action-detail/action-detail.component';
import { WebComponentWrapperComponent } from './web-component-wrapper/web-component-wrapper.component';

@NgModule({
	declarations: [
		AppComponent, ActionsListComponent, ActionDetailComponent, WebComponentWrapperComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatGridListModule,
		HttpClientModule,
		MatCardModule,
		MatSliderModule,
		MatButtonModule,
		MatToolbarModule,
		MatIconModule,
		MatExpansionModule
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
