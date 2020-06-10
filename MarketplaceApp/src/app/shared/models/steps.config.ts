import { StepDefinition } from './step.definition';

export class StepsConfig {
	constructor(public stepsDefinition: StepDefinition[], public stepPath: string) { }
}
