const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");

toggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
    toggle?.setAttribute("aria-label", "Open navigation");
  });
});

const hero = document.querySelector(".hero");
const heroRobotHead = document.querySelector(".robot-head");
const motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

if (hero && heroRobotHead && motionAllowed) {
  const updateRobotLook = (event) => {
    const rect = heroRobotHead.getBoundingClientRect();
    const headCenterX = rect.left + rect.width / 2;
    const headCenterY = rect.top + rect.height / 2;
    const deltaX = event.clientX - headCenterX;
    const deltaY = event.clientY - headCenterY;
    const rotate = clamp(deltaX / 42, -16, 16);
    const tilt = clamp(deltaY / -70, -7, 7);
    const eyeX = clamp(deltaX / 95, -7, 7);
    const eyeY = clamp(deltaY / 110, -5, 5);

    hero.style.setProperty("--head-rotate", `${rotate}deg`);
    hero.style.setProperty("--head-tilt", `${tilt}deg`);
    hero.style.setProperty("--eye-x", `${eyeX}px`);
    hero.style.setProperty("--eye-y", `${eyeY}px`);
  };

  const resetRobotLook = () => {
    hero.style.setProperty("--head-rotate", "0deg");
    hero.style.setProperty("--head-tilt", "0deg");
    hero.style.setProperty("--eye-x", "0px");
    hero.style.setProperty("--eye-y", "0px");
  };

  hero.addEventListener("pointermove", updateRobotLook);
  hero.addEventListener("pointerleave", resetRobotLook);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.15 }
);

document
  .querySelectorAll(
    ".skill-card, .project-card, .timeline-item, .credential-grid article, .workflow-step"
  )
  .forEach((element) => observer.observe(element));
