const acumaticaSecondStepTemplate = document.createElement('template');
acumaticaSecondStepTemplate.innerHTML = `
	<div class="second-step-wrapper">
        <label>
            <label for="email">Email</label>
	    	<input id="email" type="email" name="email">
	    </label>
    </div>
  `;
class AcumaticaSecondStep extends HTMLElement {
    constructor() {
        super();
        // this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const template = acumaticaSecondStepTemplate.content.cloneNode(true);
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
        this.appendChild(template);
    }
}

if (!window.customElements.get('acumatica-second-step')) {
    window.customElements.define('acumatica-second-step', AcumaticaSecondStep);
}