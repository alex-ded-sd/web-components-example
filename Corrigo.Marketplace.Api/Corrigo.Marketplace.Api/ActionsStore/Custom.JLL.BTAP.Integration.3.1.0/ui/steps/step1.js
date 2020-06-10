const btapFirstStepTeplate = document.createElement('template');
btapFirstStepTeplate.innerHTML = `
	<style>
		div {
			border: 5px solid red;
			margin-bottom: 20px;
		}
	</style>
	<div class="first-step-wrapper">
		<p>Please select your subscription:</p>
		<input type="radio" id="free" name="subscription" value="free">
		<label for="free">Free</label><br>
		<input type="radio" id="better" name="subscription" value="full">
		<label for="better">1 billion</label><br>
	</div>
  `;

class BTAPFirstStep extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		const template = btapFirstStepTeplate.content.cloneNode(true);
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
		this.shadowRoot.appendChild(template);
	}
}

if (!window.customElements.get('btap-first-step')) {
	window.customElements.define('btap-first-step', BTAPFirstStep);
}