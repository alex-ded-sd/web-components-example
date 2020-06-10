const btapSecondStepTemplate = document.createElement('template');
btapSecondStepTemplate.innerHTML = `
	<style>
		div {
			box-sizing: border-box;
            width: 300px;
            height: 100px;
            padding: 30px;  
            border: 10px solid blue;
		}
	</style>
	<div class="second-step-wrapper">
        <label>
            <label for="email">Email</label>
	    	<input id="email" type="email" action-item-name="email">
	    </label>
    </div>
  `;
class BTAPSecondStep extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.appendChild(document.importNode(btapSecondStepTemplate.content, true))
    }
}

if (!window.customElements.get('btap-second-step')) {
    window.customElements.define('btap-second-step', BTAPSecondStep);
}