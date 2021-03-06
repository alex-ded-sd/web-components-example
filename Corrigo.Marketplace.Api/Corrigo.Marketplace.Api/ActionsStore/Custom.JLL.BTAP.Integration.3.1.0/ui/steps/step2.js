const btapSecondStepTemplate = document.createElement('template');
btapSecondStepTemplate.innerHTML = `
    <style>
    	:host {
			width: 100%;
		}
		div {
			box-sizing: border-box;
            padding: 30px;  
		}
	</style>
	<div class="second-step-wrapper">
        <label>
            <label for="email">Email</label>
	    	<input id="email" type="email" name="email">
	    </label>
    </div>
  `;
class BTAPSecondStep extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const template = btapSecondStepTemplate.content.cloneNode(true);
        const listenedElement = template.getElementById('email');
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
        this.shadowRoot.appendChild(template);
    }
}

if (!window.customElements.get('btap-second-step')) {
    window.customElements.define('btap-second-step', BTAPSecondStep);
}