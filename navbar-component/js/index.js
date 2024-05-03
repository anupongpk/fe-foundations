const menuToggleEl = document.querySelector(".nav__menu-toggle");
const navMobileEl = document.querySelector(".nav__mobile");
const headerEl = document.querySelector(".header");

menuToggleEl.addEventListener("click", () => {
  menuToggleEl.classList.toggle("nav__menu-toggle--open");
  navMobileEl.classList.toggle("nav__mobile--open");
  headerEl.classList.toggle("bg-white");
});
