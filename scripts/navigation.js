const menuButton = document.querySelector("#menu");
const navMenu = document.querySelector("#nav-menu");

menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("open");

  const isOpen = navMenu.classList.contains("open");

  menuButton.textContent = isOpen ? "✕" : "☰";
  menuButton.setAttribute("aria-expanded", isOpen);

  if (isOpen) {
    menuButton.setAttribute("aria-label", "Close navigation menu");
  } else {
    menuButton.setAttribute("aria-label", "Open navigation menu");
  }
});