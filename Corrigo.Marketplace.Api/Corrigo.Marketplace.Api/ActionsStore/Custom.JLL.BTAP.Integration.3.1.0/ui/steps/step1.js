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
		this.shadowRoot.appendChild(document.importNode(btapFirstStepTeplate.content, true))
	}
}

if (!window.customElements.get('btap-first-step')) {
	window.customElements.define('btap-first-step', BTAPFirstStep);
}