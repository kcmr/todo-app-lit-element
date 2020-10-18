import { host } from '../styles';

export const withBasicStyles = (superClass) =>
  class extends superClass {
    static get styles() {
      return [super.styles, host()].filter(Boolean);
    }
  };
