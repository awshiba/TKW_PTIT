class Empty extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div class="content">
    <h1 class="title">Something went wrong</h1>
    <div onClick={document.location.reload()} class="btnRetryEmpty">
      Retry
    </div>
    </div>
    `;
  }
}

customElements.define('app-empty', Empty);
