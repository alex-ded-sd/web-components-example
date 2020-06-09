import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class SetBasePathInterceptor implements HttpInterceptor {
	constructor() { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const apiReq = req.clone({ url: `${environment.baseUrl}/api/${req.url}` });
		return next.handle(apiReq);
	}
}
