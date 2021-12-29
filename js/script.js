const wrapper = document.getElementById('wrapper');
const navBar = document.querySelector('.header__navbar');
const bgOverlay = document.querySelector('div.navbar__popup-overlay');
const btnShopNav = document.querySelector("a[class='header__navbar-link']");
const dropdownNav = document.querySelector('.navbar__item-dropdown');
const webLogo = document.querySelector('.header__navbar-logo');
const accountBtn = document.querySelector('.header__right-icon.account');
const homeBtn = document.querySelector('.header__navbar-item.home');

const routeCss = document.querySelector('link[value="css"]');
const routeJs = document.querySelector('script');

const TOP_STATUS_HEIGHT = 44;
const body = document.body;
const pathNameRgx = new RegExp('(?<=src/)(.*)(?=.html)');

const ROUTER = {
  HOME: 'HOME',
  PRODUCT: 'PRODUCT',
  LOGIN: 'LOGIN',
};
const listHtmlPath = [
  '../src/home.html',
  '../src/login.html',
  '../src/product.html',
];
const htmlContent = {};

function getElementByXpath(path) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}

function handleOnError() {
  wrapper.innerHTML = `<app-empty>`;
  routeCss.setAttribute('href', '../css/empty.css');
}

const navigate = (route) => {
  if (Object.keys(htmlContent).includes(route)) {
    wrapper.innerHTML = htmlContent[route].content;
    routeCss.setAttribute('href', htmlContent[route].css);
  } else {
    handleOnError();
  }
};

const fetchHtmlData = () => {
  if (!Object.keys(listHtmlPath).length) {
    throw new Error('fetch data failed');
  }
  listHtmlPath.forEach(async (path) => {
    let key = pathNameRgx.exec(path)[0];
    let content = await (await fetch(path)).text();
    htmlContent[key.toUpperCase()] = {
      content,
      css: '../css/' + key + '.css'
    };

    script();
  });
};

const handleNavBar = () => {
  const stickyNavbar = () => {
    if (window.scrollY > navBar.offsetTop) {
      navBar.classList.add('sticky');
    } else {
      navBar.classList.remove('sticky');
    }
  };

  window.onscroll = () => {
    stickyNavbar();
  };

  webLogo.addEventListener('click', () => {
    navigate(ROUTER.HOME);
  });

  homeBtn.addEventListener('click', () => {
    navigate(ROUTER.HOME);
  });

  accountBtn.addEventListener('click', () => {
    navigate(ROUTER.LOGINS);
  });

  // Shop button navbar click
  btnShopNav.addEventListener('click', () => {
    const scrollY = window.scrollY;
    if (window.scrollY > TOP_STATUS_HEIGHT) {
      navBar.style.position = `fixed`;
      navBar.style.top = `0`;
      navBar.style.width = `100%`;
    }
    dropdownNav.classList.add('visible');
    bgOverlay.classList.add('active');
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    bgOverlay.style.top = `-${scrollY}px`;
    bgOverlay.style.opacity = `2`;
  });

  // handle background overlay click
  bgOverlay.addEventListener('click', () => {
    bgOverlay.classList.remove('active');
    dropdownNav.classList.remove('visible');
    const scrollY = document.body.style.top;
    body.style.position = '';
    body.style.top = '';
    navBar.style.position = ``;
    navBar.style.top = ``;
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  });
};

const script = () => {
  let currentRoute = ROUTER.HOME;
  handleNavBar();

  // switch (currentRoute) {
  //   case ROUTER.EMPTY:
  //     handleOnEmpty()
  //   default:
  // }

  navigate(currentRoute);
};

try {
  fetchHtmlData();
} catch (err) {
  handleOnError();
}
