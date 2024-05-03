const menuToggleEl = document.querySelector(".nav__menu-toggle");
const navMobileEl = document.querySelector(".nav__mobile");
const headerEl = document.querySelector(".header");

// toggle aria attributes
function toggleAriaAttributes() {
  navMobileEl.ariaExpanded =
    navMobileEl.ariaExpanded === "true" ? "false" : "true";
  navMobileEl.ariaHidden = navMobileEl.ariaHidden === "true" ? "false" : "true";
}

menuToggleEl.addEventListener("click", () => {
  menuToggleEl.classList.toggle("nav__menu-toggle--open");
  navMobileEl.classList.toggle("nav__mobile--open");
  headerEl.classList.toggle("bg-white");
  toggleAriaAttributes();
  menuToggleEl.blur();
});

// Escape key to close mobile menu
function CloseMobileMenu() {
  menuToggleEl.classList.remove("nav__menu-toggle--open");
  navMobileEl.classList.remove("nav__mobile--open");
  headerEl.classList.remove("bg-white");
  menuToggleEl.focus();
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    CloseMobileMenu();
    toggleAriaAttributes();
  }
});
