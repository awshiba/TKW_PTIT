class TopStatus extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div class="topStatus">
      <div class="topStatusText">Free shipping on international orders over ₫‌3,728,300</div>
    </div>
    `;
  }
}

class NavBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div class="nav"></div>
    `;
  }
}

customElements.define('app-top-status', TopStatus)
customElements.define('app-nav', NavBar);
