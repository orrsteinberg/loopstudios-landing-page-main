const throttle = (callback, interval) => {
  // Limit rate of function calls (while scrolling, in our case)
  let allowCall = true;

  return () => {
    if (allowCall) {
      allowCall = false;
      callback();
      setTimeout(() => (allowCall = true), interval);
    }
  };
};

const mobileNav = (navElement) => {
  // Handler functions will have private access to this variable via closure
  let menuIsOpen = false;

  // If scrolled, add a dynamic class to the navbar (to add a background in our case)
  const handleScroll = () => {
    if (window.scrollY > navElement.offsetHeight) {
      navElement.classList.add("navbar--scrolled");
    } else {
      navElement.classList.remove("navbar--scrolled");
    }
  };

  // Toggle menu, change icon button and enable/disable scrolling appropriately
  const handleToggleClick = () => {
    if (menuIsOpen) {
      navElement.classList.remove("navbar--active");
      document.body.style.overflow = "auto";
    } else {
      navElement.classList.add("navbar--active");
      document.body.style.overflow = "hidden";
    }
    menuIsOpen = !menuIsOpen;
  };

  // Scroll back to top, if the menu is open then close it first
  const handleLogoClick = () => {
    if (menuIsOpen) handleToggleClick();

    window.scrollTo({ top: 0 });
  };

  // If clicked on a mobile menu link, close menu
  const handleNavClick = ({ target }) => {
    if (menuIsOpen && target.classList.contains("navbar__menu-link")) {
      handleToggleClick();
    }
  };

  // Expose handler functions, use a throttled version of the scroll handler
  return {
    handleScroll: throttle(handleScroll, 100),
    handleToggleClick,
    handleLogoClick,
    handleNavClick,
  };
};

document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const navElement = document.querySelector(".navbar");
  const navLogoElement = document.querySelector(".navbar__logo");
  const navToggleElement = document.querySelector(".navbar__toggle");

  if (navElement && navToggleElement && navLogoElement) {
    // Get mobile nav handler functions
    const {
      handleScroll,
      handleToggleClick,
      handleLogoClick,
      handleNavClick,
    } = mobileNav(navElement);

    // Event handlers
    window.addEventListener("scroll", handleScroll);
    navElement.addEventListener("click", handleNavClick);
    navToggleElement.addEventListener("click", handleToggleClick);
    navLogoElement.addEventListener("click", handleLogoClick);
  }
});
