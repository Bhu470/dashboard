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
    const rotate = clamp(deltaX / 24, -22, 22);
    const tilt = clamp(deltaY / -42, -12, 12);
    const eyeX = clamp(deltaX / 48, -11, 11);
    const eyeY = clamp(deltaY / 58, -8, 8);
    const bodyLean = clamp(deltaX / 120, -6, 6);
    const armLeft = clamp(12 + deltaX / 38 + deltaY / 180, -4, 28);
    const armRight = clamp(-12 + deltaX / 38 - deltaY / 180, -28, 4);
    const lift = clamp(deltaY / -220, -4, 6);

    hero.style.setProperty("--head-rotate", `${rotate}deg`);
    hero.style.setProperty("--head-tilt", `${tilt}deg`);
    hero.style.setProperty("--eye-x", `${eyeX}px`);
    hero.style.setProperty("--eye-y", `${eyeY}px`);
    hero.style.setProperty("--body-lean", `${bodyLean}deg`);
    hero.style.setProperty("--arm-left-rotate", `${armLeft}deg`);
    hero.style.setProperty("--arm-right-rotate", `${armRight}deg`);
    hero.style.setProperty("--robot-lift", `${lift}px`);
  };

  const resetRobotLook = () => {
    hero.style.setProperty("--head-rotate", "0deg");
    hero.style.setProperty("--head-tilt", "0deg");
    hero.style.setProperty("--eye-x", "0px");
    hero.style.setProperty("--eye-y", "0px");
    hero.style.setProperty("--body-lean", "0deg");
    hero.style.setProperty("--arm-left-rotate", "12deg");
    hero.style.setProperty("--arm-right-rotate", "-12deg");
    hero.style.setProperty("--robot-lift", "0px");
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
