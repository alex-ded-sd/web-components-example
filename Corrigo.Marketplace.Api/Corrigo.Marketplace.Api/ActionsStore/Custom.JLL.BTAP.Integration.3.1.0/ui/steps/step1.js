class CorrigoInputHtmlElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `Hello, <strong>${this.getAttribute('name')}</strong> :)`;
    }
}

window.customElements.define('corrigo-input', CorrigoInputHtmlElement);