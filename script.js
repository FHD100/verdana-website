const root = document.documentElement;
const header = document.querySelector("[data-header]");
const revealItems = document.querySelectorAll(".reveal");

let ticking = false;

function updateScrollState() {
  const scrollY = window.scrollY || 0;
  root.style.setProperty("--scroll", scrollY.toFixed(2));
  header.classList.toggle("is-scrolled", scrollY > 18);
  ticking = false;
}

function queueScrollUpdate() {
  if (!ticking) {
    window.requestAnimationFrame(updateScrollState);
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
  { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));
window.addEventListener("scroll", queueScrollUpdate, { passive: true });
window.addEventListener("resize", queueScrollUpdate);
updateScrollState();
