const root = document.documentElement;
const header = document.querySelector("[data-scroll-header]");
const revealItems = document.querySelectorAll(".reveal");

let ticking = false;

function updateScrollEffects() {
  const scrollY = window.scrollY || 0;
  root.style.setProperty("--scroll", scrollY.toFixed(2));
  header.classList.toggle("is-scrolled", scrollY > 24);
  ticking = false;
}

function requestScrollUpdate() {
  if (!ticking) {
    window.requestAnimationFrame(updateScrollEffects);
    ticking = true;
  }
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));
window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("resize", requestScrollUpdate);
updateScrollEffects();
