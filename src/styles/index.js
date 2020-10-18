import { css } from 'lit-element';

const ul = (styles = css``) => css`
  ul {
    margin: 0;
    padding: 0;
    ${styles}
  }
`;

const button = (styles = css``) => css`
  button {
    font: inherit;
    font-size: 0.8125rem;
    line-height: 1.8;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    background-color: #f0f0f0;
    color: #676565;
    cursor: pointer;
    border: none;
    border-radius: 2px;
    text-transform: lowercase;

    ${styles}
  }

  button:hover {
    background-color: #dcdcdc;
  }

  button.danger {
    background-color: #f3d7d7;
    color: #a02323;
  }

  button.danger:hover {
    background-color: #eabbbb;
  }
`;

const host = (styles = css``) => css`
  :host {
    display: block;
    ${styles}
  }

  :host[hidden] {
    display: none;
  }

  [hidden] {
    display: none !important;
  }
`;

const item = css`
  .item {
    display: flex;
    padding: 0.5rem;
    align-items: center;
    font-size: 0.9375rem;
  }

  .item + .item {
    border-top: 1px solid #f0f0f0;
  }
`;

const box = css`
  .box {
    margin: 1rem;
    padding: 0.5rem;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.5) 0 2px 3px -2px;
    border-radius: 2px;
  }
`;

const actionBar = css`
  .action-bar {
    display: flex;
    align-items: center;
    margin: 0.5rem 0 1rem;
    padding: 0 0.5rem;
    justify-content: flex-end;
  }

  .action-bar.bottom-bar {
    margin: 1rem 0 0.5rem;
  }

  .action-bar .title {
    font-size: 1.25rem;
    font-weight: 500;
    margin: 0;
    flex: 1;
  }
`;

export { host, ul, button, item, box, actionBar };
