const acumaticaFirstStepTeplate = document.createElement('template');
acumaticaFirstStepTeplate.innerHTML = `
	<div class="first-step-wrapper">
		<p>Please select your subscription:</p>
		<input type="radio" id="free" name="subscription" value="free">
		<label for="free">Free</label><br>
		<input type="radio" id="better" name="subscription" value="full">
		<label for="better">1 billion</label><br>
		<div class="acumatica-first-step-wrapper">
        <label>
            <label for="company">Company</label>
	    	<input id="company" type="text" name="company">
	    </label>
    </div>
  `;

class AcumaticaFirstStep extends HTMLElement {
	constructor() {
		super();
		//this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		const template = acumaticaFirstStepTeplate.content.cloneNode(true);
		const listenedElements = template.querySelectorAll('[type=radio]');
		listenedElements.forEach(element => {
			element.addEventListener('change', event => {
				this.dispatchEvent(new CustomEvent('stepchange', {
					bubbles: true,
					detail: {
						name: event.target.name,
						value: event.target.value,
						override: true
					}
				}));
			});
		});
		const listenedElement = template.getElementById('company');
		listenedElement.addEventListener('change', event => {
			this.dispatchEvent(new CustomEvent('stepchange', {
				bubbles: true,
				detail: {
					name: event.target.name,
					value: event.target.value,
					override: true
				}
			}));
		});
		this.appendChild(template);
	}
}

if (!window.customElements.get('acumatica-first-step')) {
	window.customElements.define('acumatica-first-step', AcumaticaFirstStep);
}