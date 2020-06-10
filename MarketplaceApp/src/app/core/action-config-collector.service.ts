import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConfigItemModel } from '../shared/models/config.item.model';

@Injectable({
	providedIn: 'root'
})
export class ActionConfigCollectorService {

	private itemsModel: ConfigItemModel[] = [];

	push(itemModel: ConfigItemModel) {
		const index = this.itemsModel.findIndex(item => item.name === itemModel.name);

		if (index === -1) {
			this.itemsModel.push(itemModel);
			return;
		}

		if (itemModel.override) {
			this.itemsModel[index] = itemModel;
			return;
		}
	}

	getItems(): ConfigItemModel[] {
		const copiedItems = [...this.itemsModel];
		return copiedItems;
	}

	constructor() { }
}
