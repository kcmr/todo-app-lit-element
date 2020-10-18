import { host } from '../styles';

export const withBasicStyles = (superClass) =>
  class extends superClass {
    static get styles() {
      return [host(), super.styles].filter(Boolean);
    }
  };
