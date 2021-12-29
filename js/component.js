class Empty extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div class="content">
    <img width="500" src="https://cdn.dribbble.com/users/1078347/screenshots/2799566/media/8a4ae0833c5e06c34e48b87c7583dc2d.png?compress=1&resize=800x600" alt="">
    <div onClick={document.location.reload()} class="btnRetryEmpty">
      Reload
    </div>
    </div>
    `;
  }
}

customElements.define('app-empty', Empty);
