export function defineCustomElement(tag, klass) {
  if (!window.customElements.get(tag)) {
    window.customElements.define(tag, klass);
  }
}
