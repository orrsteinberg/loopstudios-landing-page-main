const mobileNav = (navbar, toggle, menu) => {
  // Current menu status
  // Handler functions will have private access to this variable via closure
  let menuIsOpen = false;

  // Limit rate of function calls (while scrolling, in our case)
  const throttle = (callback, interval) => {
    let allowCall = true;

    return () => {
      if (allowCall) {
        allowCall = false;
        callback();
        setTimeout(() => (allowCall = true), interval);
      }
    };
  };

  // If scrolled, add a dynamic class to the navbar (to add a background in our case)
  const handleScroll = () => {
    if (window.scrollY > navbar.offsetHeight) {
      navbar.classList.add("navbar--scrolled");
    } else {
      navbar.classList.remove("navbar--scrolled");
    }
  };

  // Toggle menu, icon and enable/disable scrolling appropriately
  const handleToggleClick = () => {
    if (menuIsOpen) {
      toggle.classList.remove("navbar__toggle--active");
      menu.classList.remove("navbar__menu--active");
      document.body.style.overflow = "auto";
    } else {
      toggle.classList.add("navbar__toggle--active");
      menu.classList.add("navbar__menu--active");
      document.body.style.overflow = "hidden";
    }
    menuIsOpen = !menuIsOpen;
  };

  // Scroll back to top, if the menu is open then close it first
  const handleLogoClick = () => {
    if (menuIsOpen) handleToggleClick();

    window.scrollTo({ top: 0 });
  };

  // Expose handler functions, use a throttled version of the scroll handler
  return {
    handleScroll: throttle(handleScroll, 100),
    handleToggleClick,
    handleLogoClick,
  };
};

document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const navElement = document.querySelector(".navbar");
  const navLogoElement = document.querySelector(".navbar__logo");
  const navToggleElement = document.querySelector(".navbar__toggle");
  const navMenuElement = document.querySelector(".navbar__menu");

  if (navElement && navToggleElement && navLogoElement && navMenuElement) {
    // Get mobile nav handler functions
    const { handleScroll, handleToggleClick, handleLogoClick } = mobileNav(
      navElement,
      navToggleElement,
      navMenuElement
    );

    // Event handlers
    window.addEventListener("scroll", handleScroll);
    navToggleElement.addEventListener("click", handleToggleClick);
    navLogoElement.addEventListener("click", handleLogoClick);
  }
});
